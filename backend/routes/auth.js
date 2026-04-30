const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();
const jwt = require("jsonwebtoken");

// ✅ SIGN UP
router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // 🔍 Normalize email (IMPORTANT FIX)
    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return res.status(400).json({
        message: "Already registered, please login"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email: email.toLowerCase(),   // ✅ FIX
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

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // 🔍 Normalize email (IMPORTANT FIX)
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(400).json({
        message: "User not registered"
      });
    }

    // 🔐 Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    // 🧪 Debug (you can remove later)
    console.log("Entered Password:", password);
    console.log("Stored Hash:", user.password);
    console.log("Match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    // ✅ Success
    res.status(200).json({
     message: "Login successful",
  token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error during login"
    });
  }
});

module.exports = router;