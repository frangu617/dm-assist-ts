const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordDigest: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("passwordDigest")) {
    this.passwordDigest = await bcrypt.hash(this.passwordDigest, 10);
  }
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
