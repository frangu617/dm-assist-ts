// Core Dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

// Routers
const characterRoutes = require("./controllers/characterController");
const userRoutes = require("./controllers/users");
const authRoutes = require("./controllers/authentication");
const messageRoutes = require("./controllers/messageController");

// Middleware
const {defineCurrentUser} = require("./middleware/defineCurrentUser");

// Constants
const app = express();
const port = process.env.PORT || 5000;

// Database Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Middleware Setup
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(defineCurrentUser);

// Routes
app.use("/api/characters", characterRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Production Environment Setup
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Start the Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
