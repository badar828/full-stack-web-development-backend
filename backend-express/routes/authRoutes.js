const User = require("../models/User");
const router = require("express").Router();
const { register, login } = require("../controllers/authController");
router.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});
router.post("/register", register);
router.post("/login", login);

module.exports = router;