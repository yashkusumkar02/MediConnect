const express = require('express');
const Router = express.Router();
const User = require('../models/user');  // Renaming 'client' to 'User' to avoid conflict
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('./hospitalRoutes');
// const user = require('../models/user');
require('dotenv').config();

// Register Route
Router.post('/', async (req, res) => {
  try {
    const { name, email, password,phone,
      dateOfBirth,
      address,
      city,
      state,
      zipCode } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword, // Store the hashed password
      phone,
      dateOfBirth,
      address,
      city,
      state,
      zipCode,
    });
    await user.save();
    res.status(200).json({ message: 'User has been added successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while adding the user.' });
    console.log(error);
  }
});

// Client Login Route
Router.get('/login', async (req, res) => {
  const { email, password } = req.query;
  console.log(email, password);
  try {
    const client = await User.findOne({ email });
    if (!client) {
      return res.status(400).json({ message: 'Client not found' });
    }

    const isMatch = await bcrypt.compare(password, client.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ email: client.email, type: 'client' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token,  type: 'client', client: {
      // id: client.id,
     
      name: client.name,
      email: client.email,
      phone: client.phone,
      dateOfBirth: client.dateOfBirth,
      address: client.address,
      city: client.city,
      state: client.state,
      zipCode: client.zipCode,
    }, });
  } catch (error) {
    console.error('Error during client login:', error);
    res.status(500).json({ message: 'An error occurred during client login' });
  }
});





module.exports = Router;
