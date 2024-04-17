const express = require("express");
const router = express.Router();
const Message = require("../models/message");
const User = require("../models/user");

// Send a new message
router.post("/send", async (req, res) => {
  const { from, toUsername, message } = req.body;
  try {
    const to = await User.findOne({ username: toUsername });
    if (!to) {
      return res.status(404).json({ error: "Recipient not found" });
    }
    const newMessage = new Message({ from, to: to._id, message });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get messages between two users
router.get("/messages/:username", async (req, res) => {
  const { username } = req.params;
  const currentUser = req.currentUser._id;
  try {
    const otherUser = await User.findOne({ username });
    if (!otherUser) {
      return res.status(404).json({ error: "User not found" });
    }
    const messages = await Message.find({
      $or: [
        { from: currentUser, to: otherUser._id },
        { from: otherUser._id, to: currentUser },
      ],
    })
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(messages.reverse());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
