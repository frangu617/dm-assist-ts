const jwt = require("jsonwebtoken"); // Make sure this is 'jsonwebtoken', not 'json-web-token'
const User = require("../models/user"); // Directly import the User model

async function defineCurrentUser(req, res, next) {
  if (!req.headers.authorization) return next();

  const [bearer, token] = req.headers.authorization.split(" ");
  if (bearer !== "Bearer") return next();

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id); // Correctly assign user found by ID
    if (user) {
      req.currentUser = user;
      next();
    } else {
      return res.status(401).json({ error: "User not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Invalid token" });
  }
}


function requiredRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.currentUser) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { role } = req.currentUser;
    if (allowedRoles.includes(role)) {
      next();
    } else {
      res.status(403).json({ error: "Forbidden: Insufficient permissions" });
    }
  };
}


module.exports = { defineCurrentUser, requiredRoles };
