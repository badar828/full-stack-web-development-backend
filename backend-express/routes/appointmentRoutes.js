const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// POST route to handle incoming form data from React
router.post("/book", async (req, res) => {
  try {
    // 1. Destructure all elements sent by your React state
    const { doctor, date, problem } = req.body;

    // 2. Create the document matching your Mongoose schema parameters
    const newAppointment = new Appointment({
      // Using a valid placeholder ObjectId for testing since auth is disabled
      patientId: "65f123456789abcdef012345", 
      
      // Map 'date' from React into 'appointmentDate'
      appointmentDate: date ? new Date(date) : new Date(),
      
      status: "pending",

      // Add custom key-value tracking to hold structural data sent from React
      // NOTE: Since your original model schema lacks 'doctorName' or 'problem' keys, 
      // Mongoose might filter them out unless you add them to models/Appointment.js
      doctorName: doctor, 
      notes: problem      
    });

    // 3. Save the completed document to MongoDB
    await newAppointment.save();

    res.status(201).json({
      message: "Appointment booked successfully and recorded in MongoDB!"
    });

  } catch (error) {
    console.error("Database save error:", error);
    res.status(500).json({ 
      message: "Server failed to save appointment", 
      error: error.message 
    });
  }
});

module.exports = router;