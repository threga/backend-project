const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const LoginLog = require("../models/LoginLog");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    console.log("LOGIN BODY:", req.body); // 🔥 DEBUG

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    let user = await User.findOne({ email });

    // Auto-create user if not exists (since no signup page)
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await User.create({
        name: email.split("@")[0],
        email,
        password: hashedPassword,
      });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    }

    await LoginLog.create({
      userId: user._id,
      email: user.email,
    });

    return res.json({ message: "Login successful" });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
