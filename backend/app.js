const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const hospitalRoutes = require('./routes/hospitalRoutes');
const clientRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/auth');
const appointmentRoutes = require('./routes/appointments');
const connectDB = require('./config/db');
const port = 3000;
require("dotenv").config();

connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // To parse JSON request bodies

app.use('/api/hospitals', hospitalRoutes);
app.use('/api/clients', clientRoutes);

// app.use('/api', appointmentRoutes);
// Use appointment routes
app.use('/api/appointments', appointmentRoutes);
app.use('/api/auth', authRoutes)
// app.use('/api/hospitals/login', authRoutes);
// app.use('/api/clients/login', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
