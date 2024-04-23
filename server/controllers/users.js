const router = require("express").Router();
const User = require("../models/user"); // Ensure this is pointing to your Mongoose User model
const bcrypt = require("bcrypt");
const { defineCurrentUser, requiredRoles } = require("../middleware/defineCurrentUser");

// // Create a new user
router.post("/", async (req, res) => {
  try {
    const { username, email, password, role = "user"} = req.body; // Destructure to get the username, email, and password directly

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const user = new User({
      username,
      email,
      password, // Save the hashed password in the password field
      passwordDigest: hashedPassword,
      role
    });

    // Save the new user to the database
    await user.save();

    // Respond with a success message
    res.status(201).json({
      message: "User created successfully",
      user: { id: user._id, username: user.username, email: user.email, role: user.role }, // Only send back necessary user information
    });
  } catch (error) {
    // If an error occurs, respond with an error message
    res.status(400).json({ error: "Could not create user: " + error.message });
  }
});


// Get all users (This route should be protected and only accessible by administrators)
router.get("/", requiredRoles("admin"), async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Use .select to avoid sending back the password
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error: " + error.message });
  }
});

router.get("/current", defineCurrentUser, async (req, res) => {
  // Assuming `defineCurrentUser` middleware correctly attaches the user to `req.currentUser`
  if (!req.currentUser) {
    return res.status(401).json({ error: "Unauthorized: No current user" });
  }

  // Depending on how you want to handle the response, you may choose to omit certain fields
  const { password, ...userData } = req.currentUser.toObject();
  res.json(userData);
});

router.get("/available", async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "admin" } }).select(
      "-password"
    );
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error: " + error.message });
  }
});
module.exports = router;
