const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Register user
router.post("/register", async (req, res) => {
  const { name, email, mobile } = req.body;

  try {
    let existing = await User.findOne({ mobile });

    if (existing) {
      return res.json({ registered: true, message: "Already Registered" });
    }

    const user = new User({ name, email, mobile });

    await user.save();

    res.json({ registered: true });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Verify user
router.post("/verify", async (req, res) => {
  const { mobile } = req.body;

  const user = await User.findOne({ mobile });

  if (user) {
    res.json({ registered: true });
  } else {
    res.json({ registered: false });
  }
});

module.exports = router;
