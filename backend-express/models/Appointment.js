const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor"
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  appointmentDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ["pending", "approved", "completed"],
    default: "pending"
  },
  // ADD THESE TWO FIELDS SO MONGOOSE DOES NOT DROP THEM:
  doctorName: {
    type: String
  },
  notes: {
    type: String
  }
});

module.exports = mongoose.model("Appointment", appointmentSchema);