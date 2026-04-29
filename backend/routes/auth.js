const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();


// ✅ SIGN UP
router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // 🔍 Validation
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // 🔍 Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Already registered, please login"
      });
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({
      message: "Signup successful"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error during signup"
    });
  }
});


// ✅ SIGN IN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // 🔍 Validation
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // 🔍 Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not registered"
      });
    }

    // 🔐 Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    // ✅ Success
    res.status(200).json({
      message: "Login successful"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error during login"
    });
  }
});

module.exports = router;
