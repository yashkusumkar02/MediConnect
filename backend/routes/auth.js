const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const Hospital = require("../models/hospital"); // Correct model name
const Client = require("../models/user");
require("dotenv").config();

// Forgot Password Route
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const hospital = await Hospital.findOne({ email });
    if (!hospital)
      return res.status(404).json({ error: "Hospital not found." });

    const token = crypto.randomBytes(32).toString("hex");
    hospital.resetToken = token;
    hospital.tokenExpiry = Date.now() + 3600000; // 1 hour
    await hospital.save();

    // Corrected link for the frontend (React app running on port 5173)
    const resetLink = 
    //http://localhost:5173/reset-password/${token}
     `${process.env.AUTH_HOSPITAL_API}/${token}`;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.APP_PASS,
      },
    });

    await transporter.sendMail({
      to: hospital.email,
      subject: "Password Reset Request",
      html: `<p>Click the link to reset your password:</p><a href="${resetLink}">Reset Password</a>`,
    });

    res.json({ message: "Reset email sent successfully." });
  } catch (err) {
    res.status(500).json({ error: "Internal server error." });
  }
});

// Reset Password Route (POST method to reset password)
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // Find the hospital with the provided reset token and check expiry
    const hospital = await Hospital.findOne({
      resetToken: token,
      tokenExpiry: { $gt: Date.now() },
    });

    if (!hospital) {
      return res.status(400).json({ error: "Invalid or expired token." });
    }

    // Hash the new password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);
    hospital.password = hashedPassword;
    hospital.resetToken = undefined; // Remove reset token after successful reset
    hospital.tokenExpiry = undefined; // Remove token expiry
    await hospital.save();

    res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

// Forgot Password Route
router.post("/client-forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    // Find the client by email
    const client = await Client.findOne({ email });
    if (!client) return res.status(404).json({ error: "Client not found." });

    // Generate a random reset token
    const token = crypto.randomBytes(32).toString("hex");
    client.resetToken = token;
    client.tokenExpiry = Date.now() + 3600000; // Token expires in 1 hour
    await client.save();

    // Link for the frontend (React app running on port 5173)
    const resetLink = 
    // http://localhost:5173/client-reset-password/${token}
    `${process.env.AUTH_CLIENT_API}/${token}`
    ;
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.APP_PASS,
      },
    });

    // Send the reset email
    await transporter.sendMail({
      to: client.email,
      subject: "Password Reset Request",
      html: `<p>Click the link to reset your password:</p><a href="${resetLink}">Reset Password</a>`,
    });

    res.json({ message: "Reset email sent successfully." });
  } catch (err) {
    res.status(500).json({ error: "Internal server error." });
  }
});

// Reset Password Route (POST method to reset password)
// Route to reset password
router.post("/client-reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    // Find the client with the provided reset token and check expiry
    // Find the client with the provided reset token and check expiry
    const client = await Client.findOne({
      resetToken: token,
      tokenExpiry: { $gt: Date.now() }, // Ensure the token hasn't expired
    });

    if (!client) {
        console.log('Token:', token);
        console.log('Current time:', Date.now());
        console.log('Token expiry:', client?.tokenExpiry); // Optional chaining for safer logging
        return res.status(400).json({ error: 'Invalid or expired token.' });
    }

    // Hash the new password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);
    client.password = hashedPassword; // Update the client's password
    client.resetToken = undefined; // Remove the reset token after successful reset
    client.tokenExpiry = undefined; // Remove token expiry
    await client.save(); // Save the updated client

    res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
