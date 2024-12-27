const mongoose = require("mongoose");
require("dotenv").config();  // Load dotenv directly here

const connectDB = async () => {
  try {
    // console.log("Mongo URI:", process.env.MONGO_URI); // Check if this prints correctly
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
