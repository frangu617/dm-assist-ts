const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  to: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // For direct messages, store recipient ID
  group: { type: mongoose.Schema.Types.ObjectId, ref: "Group" }, // For group messages, store group ID
  channel: {
    type: String,
    enum: ["public", "group", "direct"],
    required: true,
  }, // Channel type
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
