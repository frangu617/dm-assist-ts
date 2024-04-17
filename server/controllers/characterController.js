const express = require("express");
const router = express.Router();
const Character = require("../models/Character"); // Ensure the path is correct
const {defineCurrentUser} = require("../middleware/defineCurrentUser");

//Apply the middleware to ensure currentUser is set
router.use(defineCurrentUser);

// Route handlers
// Create a new character
router.post("/add", async (req, res) => {
  let currentUser = req.currentUser;
  try {
    // check if the user is logged in
    if (!currentUser) {
      return res
        .status(401)
        .json({ error: "Unauthorized to create a character, but hello, how do you do" });
    }
    console.log(req.body);
    //create a new character with the user ID from currentUserr
    const character = new Character({
      ...req.body,
      user: currentUser._id, // assuming the user ID is stored in _id
    });

    // Save the new character to the database
    await character.save();
    console.log ("Character created successfully!");
    res.status(201).json(character);
  } catch (error) {
    console.log ("Could not create character: " + error.message);
    res
      .status(400)
      .json({ error: "Could not create character: " + error.message + currentUser });
  }
});

// Get a list of all characters for the current user
router.get("/", async (req, res) => {
  try {
    // Ensure that we have a logged-in user
    if (!req.currentUser) {
      return res
        .status(401)
        .json({ error: "Unauthorized: No current user detected" });
    }

    // Fetch characters that belong to the logged-in user
    const characters = await Character.find({ user: req.currentUser._id });
    res.status(200).json(characters);
  } catch (error) {
    res.status(500).json({ error: "Internal server error: " + error.message });
  }
});

// Get a specific character by ID
router.get("/:id", async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    if (!character) {
      return res.status(404).json({ error: "Character not found" });
    }
    res.status(200).json(character);
  } catch (error) {
    res.status(500).json({ error: "Internal server error: " + error.message });
  }
});

// Update a character by ID
router.put("/:id", async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    if (!character) {
      return res.status(404).json({ error: "Character not found" });
    }
    if (
      !req.currentUser ||
      character.user.toString() !== req.currentUser._id.toString()
    ) {
      return res
        .status(403)
        .json({ error: "Unauthorized to modify this character" });
    }
    Object.assign(character, req.body);
    await character.save();
    res.status(200).json(character);
  } catch (error) {
    res.status(500).json({ error: "Internal server error: " + error.message });
  }
});

// Delete a character by ID
router.delete("/:id", async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    if (!character) {
      return res.status(404).json({ error: "Character not found" });
    }
    if (
      !req.currentUser ||
      character.user.toString() !== req.currentUser._id.toString()
    ) {
      return res
        .status(403)
        .json({ error: "Unauthorized to delete this character" });
    }
    await character.remove();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal server error: " + error.message });
  }
});

module.exports = router;
