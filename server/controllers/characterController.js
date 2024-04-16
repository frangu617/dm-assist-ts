const express = require("express");
const router = express.Router();
const Character = require("../models/Character"); // Ensure the path is correct

// Route handlers
// Create a new character
router.post("/", async (req, res) => {
  try {
    const character = new Character(req.body);
    await character.save();
    res.status(201).json(character);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Could not create character: " + error.message });
  }
});

// Get a list of all characters
router.get("/", async (req, res) => {
  try {
    const characters = await Character.find();
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
