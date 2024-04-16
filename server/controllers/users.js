const router = require("express").Router();
const User = require("../models/user"); // Ensure this is pointing to your Mongoose User model
const bcrypt = require("bcrypt");

// // Create a new user
router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body; // Destructure to get the username, email, and password directly

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const user = new User({
      username,
      email,
      password: hashedPassword, // Save the hashed password in the password field
    });

    // Save the new user to the database
    await user.save();

    // Respond with a success message
    res.status(201).json({
      message: "User created successfully",
      user: { id: user._id, username: user.username, email: user.email }, // Only send back necessary user information
    });
  } catch (error) {
    // If an error occurs, respond with an error message
    res.status(400).json({ error: "Could not create user: " + error.message });
  }
});


// Get all users (This route should be protected and only accessible by administrators)
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Use .select to avoid sending back the password
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error: " + error.message });
  }
});

module.exports = router;
