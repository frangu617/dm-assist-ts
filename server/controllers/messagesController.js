const express = require("express");
const router = express.Router();
const Message = require("../models/Messages");
const User = require("../models/user");
const { defineCurrentUser } = require("../middleware/defineCurrentUser");

// Apply the defineCurrentUser middleware to all routes in this controller
router.use(defineCurrentUser);

// Send a new message
router.post("/send", async (req, res) => {
  const { from, toUsername, message, channel, groupId } = req.body;
  try {
    if (!req.currentUser) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    let to;
    if (channel === "direct") {
      to = await User.findOne({ username: toUsername });
      if (!to) {
        return res.status(404).json({ error: "Recipient not found" });
      }
    }

    let newMessage;
    if (channel === "public") {
      newMessage = new Message({ from, channel, message });
    } else if (channel === "group") {
      newMessage = new Message({ from, channel, groupId, message });
    } else if (channel === "direct") {
      newMessage = new Message({ from, to: to._id, channel, message });
    }

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get messages for public chat
router.get("/messages/public", async (req, res) => {
  try {
    const messages = await Message.find({ channel: "public" })
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(messages.reverse());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get messages for group chat
router.get("/messages/groups/:groupId", async (req, res) => {
  const { groupId } = req.params;
  try {
    const messages = await Message.find({ channel: "group", groupId })
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(messages.reverse());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get direct messages between two users
router.get("/messages/direct/:username", async (req, res) => {
  const { username } = req.params;
  try {
    if (!req.currentUser) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const otherUser = await User.findOne({ username });
    if (!otherUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const messages = await Message.find({
      channel: "direct",
      $or: [
        { from: req.currentUser._id, to: otherUser._id },
        { from: otherUser._id, to: req.currentUser._id },
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
