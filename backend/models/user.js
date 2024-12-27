// models/Client.js
const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  zipCode: {
    type: String,
    required: true,
    trim: true,
    match: [/^\d{6}$/, "Please enter a valid 6-digit zip code"],
  },
  
  // Fields for reset password functionality
  resetToken: {
    type: String,
    default: null,
  },
  tokenExpiry: {
    type: Date,
    default: null,
  },
  
}, { timestamps: true }); // Adds createdAt and updatedAt fields

module.exports = mongoose.model("Client", clientSchema, 'client');
