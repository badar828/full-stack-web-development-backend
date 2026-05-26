const Doctor = require("../models/Doctor");
const router = require("express").Router();
router.get("/", async (req, res) => {
  const doctors = await Doctor.find();
  res.json(doctors);
});
router.get("/", (req, res) => {
  res.json({ message: "Doctors API working" });
});

module.exports = router;