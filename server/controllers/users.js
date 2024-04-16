const router = require("express").Router();
const User = require("../models/user"); // Ensure this is pointing to your Mongoose User model
const bcrypt = require("bcrypt");

// Create a new user
// Previous code unchanged...
// Create a new user
router.post("/", async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      ...rest,
      passwordDigest: hashedPassword, // Match the schema field name
    });
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(400).json({ error: "Could not create user: " + error.message });
  }
});
// The rest of the code unchanged...


// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find(); // Mongoose method to find all documents
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error: " + error.message });
  }
});

module.exports = router;
