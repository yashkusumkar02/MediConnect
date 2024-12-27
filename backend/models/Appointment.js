const mongoose = require('mongoose');

// Define schema for individual appointment entries
const appointmentEntrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  preferredDate: { type: Date, required: true },
  preferredTime: { type: String, required: true },
  visited: { type: Boolean, default: null }  // Field to track visit status
});

// Define main schema for a hospital's appointments
const appointmentHospitalSchema = new mongoose.Schema({
  hospitalId: { type: String, required: true, unique: true },
  appointments: [appointmentEntrySchema]  // Embedded array of appointment entries
});

// Create and export model
const AppointmentHospital = mongoose.model('AppointmentHospital', appointmentHospitalSchema);
module.exports = AppointmentHospital;
