// Core Dependencies
const express = require("express");
const http = require("http"); // Required to create an HTTP server for socket.io
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const socketIo = require("socket.io"); // Include socket.io

// Routers
const characterRoutes = require("./controllers/characterController");
const userRoutes = require("./controllers/users");
const authRoutes = require("./controllers/authentication");
const messageRoutes = require("./controllers/messagesController");

// Middleware
const { defineCurrentUser } = require("./middleware/defineCurrentUser");

// Constants
const app = express();
const server = http.createServer(app); // Create an HTTP server instance
const io = socketIo(server, {
  // Initialize socket.io with the server instance
  cors: {
    origin: "*", // Specify which domains are allowed to connect, adjust as necessary
    methods: ["GET", "POST"],
  },
});

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

// Socket.io connection handler
io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  // Example of handling a chat message
  socket.on("chat message", (msg) => {
    console.log("Message received: ", msg);
    io.emit("chat message", msg); // Broadcast the message to all connected clients
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

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

// Start the Server with the HTTP server, not the Express app
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
