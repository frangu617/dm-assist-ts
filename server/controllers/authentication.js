const router = require("express").Router();
const User = require("../models/user"); // Ensure this is pointing to your Mongoose User model
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Ensure your .env file contains the JWT_SECRET

// User login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid user credentials" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashPass = await bcrypt.hash(password, 10)
    console.log(hashedPassword);
    console.log(hashPass);
    console.log(user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log(await bcrypt.hash(password, 10));
      return res.status(401).json({ error: "Invalid password credentials" });
    }

    // Generate a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json({ token, username: user.username }); // Send token and any other needed user info
  } catch (error) {
    res.status(500).json({ error: "Internal server error: " + error.message });
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error: " + error.message });
  }
});

module.exports = router;
