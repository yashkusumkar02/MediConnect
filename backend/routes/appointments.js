const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const AppointmentHospital = require('../models/Appointment'); // Ensure the path to your model is correct

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your email address from environment variable
    pass: process.env.APP_PASS,   // Your email password or app password from environment variable
  },
});

// POST route to book appointments
router.post('/book-appointment', async (req, res) => {
  const { hospitalId, hospitalEmail, clientData } = req.body;

  if (!hospitalId || !clientData || !hospitalEmail) {
    console.log('Error: Missing required data - Hospital ID, client data, or hospital email');
    return res.status(400).json({ message: 'Hospital ID, client data, and hospital email are required.' });
  }

  try {
    const preferredDate = new Date(clientData.preferredDate);
    const preferredDateStart = new Date(preferredDate.setHours(0, 0, 0, 0));
    const preferredDateEnd = new Date(preferredDate.setHours(23, 59, 59, 999));

    // Log preferred date range
    console.log(`Preferred Date Range: ${preferredDateStart} to ${preferredDateEnd}`);
    
    // Check if an appointment with the same email is already booked on the same day
    const existingAppointment = await AppointmentHospital.findOne({
      hospitalId,
      'appointments.email': clientData.email,
      'appointments.preferredDate': { $gte: preferredDateStart, $lt: preferredDateEnd }
    });

    if (existingAppointment) {
      console.log(`Appointment already exists for email: ${clientData.email} on this date.`);
      return res.status(400).json({ message: 'You already have an appointment booked for today with this email.' });
    }

    // Check if there are already 2 bookings for the specified date and time slot
    const slotCount = await AppointmentHospital.aggregate([
      { $match: { hospitalId } },
      { $unwind: '$appointments' },
      {
        $match: {
          'appointments.preferredDate': { $gte: preferredDateStart, $lt: preferredDateEnd },
          'appointments.preferredTime': clientData.preferredTime
        }
      },
      { $count: 'slotCount' }
    ]);

    // Log the count of bookings for this slot
    console.log(`Slot Count for ${clientData.preferredTime} on ${clientData.preferredDate}: ${slotCount.length > 0 ? slotCount[0].slotCount : 0}`);

    if (slotCount.length > 0 && slotCount[0].slotCount >= 2) {
      console.log(`The selected time slot ${clientData.preferredTime} is fully booked.`);
      return res.status(400).json({ message: 'The selected time slot is fully booked. Please choose another time.' });
    }

    // Find or create the hospital entry
    let appointmentEntry = await AppointmentHospital.findOne({ hospitalId });

    if (!appointmentEntry) {
      console.log(`Creating a new appointment entry for hospital ID: ${hospitalId}`);
      appointmentEntry = new AppointmentHospital({
        hospitalId,
        appointments: [clientData],
      });
    } else {
      console.log(`Adding new appointment to existing hospital entry for hospital ID: ${hospitalId}`);
      appointmentEntry.appointments.push(clientData);
    }

    await appointmentEntry.save();
    console.log(`Appointment saved successfully for ${clientData.name} on ${clientData.preferredDate} at ${clientData.preferredTime}`);

    // Send email confirmation
    const mailOptions = {
      from: hospitalEmail,
      to: clientData.email,
      subject: 'Appointment Booked Successfully',
      text: `Hello ${clientData.name},

Your appointment has been successfully booked!

**Appointment Details:**
- Name: ${clientData.name}
- Email: ${clientData.email}
- Phone: ${clientData.phone}
- Preferred Date: ${clientData.preferredDate}
- Preferred Time: ${clientData.preferredTime}

Thank you for choosing our service!

Best Regards,
MediConnect Team`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Confirmation email sent to ${clientData.email}`);

    res.status(201).json({ message: 'Appointment booked successfully and email sent.' });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ message: 'Error booking appointment' });
  }
});

router.get('/:hospitalId', async (req, res) => {
  try {
    const hospitalAppointments = await AppointmentHospital.findOne({ hospitalId: req.params.hospitalId });
    if (!hospitalAppointments) {
      return res.status(404).json({ message: 'Hospital not found' });
    }
    console.log("Appointments fetched:", hospitalAppointments.appointments);  // Log fetched appointments
    res.json(hospitalAppointments.appointments);  // Send appointments array
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: 'Server error' });
  }
});



// PUT to update visit status
router.put('/update', async (req, res) => {
  const { hospitalId, appointmentId, visited } = req.body;

  try {
    const hospital = await AppointmentHospital.findOneAndUpdate(
      { hospitalId, "appointments._id": appointmentId },
      { $set: { "appointments.$.visited": visited } },
      { new: true }
    );

    if (!hospital) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json({ message: 'Visit status updated', updatedAppointment: hospital.appointments });
  } catch (error) {
    console.error("Error updating visit status:", error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Route to fetch all appointments for a client using their email
router.post('/client-appointments', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    console.log("Request missing email query parameter.");
    return res.status(400).json({ message: "Email is required" });
  }

  console.log(`Starting to fetch appointments for client with email: ${email}`);

  try {
    // Attempt to find the hospital document with an appointment matching the email
    const hospital = await AppointmentHospital.findOne({
      'appointments.email': email,
    });

    // Log whether a hospital document was found
    if (!hospital) {
      console.log(`No hospital found with any appointments for email: ${email}`);
      return res.status(404).json({ message: "No appointments found for this email" });
    }

    console.log(`Hospital found: ${hospital.hospitalId} with appointments array length: ${hospital.appointments.length}`);

    // Filter the appointments specific to the client email
    const clientAppointments = hospital.appointments.filter(appointment => {
      console.log(`Checking appointment with email: ${appointment.email}`);
      return appointment.email === email;
    });

    // Log the number of appointments found
    console.log(`Total appointments found for client email ${email}: ${clientAppointments.length}`);

    // Return the filtered appointments for the client
    if (clientAppointments.length > 0) {
      return res.status(200).json(clientAppointments);
    } else {
      console.log(`No appointments found in hospital document for email: ${email}`);
      return res.status(404).json({ message: "No appointments found for this email" });
    }

  } catch (error) {
    console.error("Error fetching appointments:", error);
    return res.status(500).json({ message: "Server error" });
  }
});




module.exports = router;
