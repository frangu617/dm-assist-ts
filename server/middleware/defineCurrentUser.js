const jwt = require("jsonwebtoken"); // Make sure this is 'jsonwebtoken', not 'json-web-token'
const User = require("../models/user"); // Directly import the User model

async function defineCurrentUser(req, res, next) {
  if (!req.headers.authorization) return next();

  const [bearer, token] = req.headers.authorization.split(" ");
  if (bearer !== "Bearer") return next();

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET); // jwt.verify returns the payload directly
    req.currentUser = await User.findById(payload.userId); // Assuming payload contains userId
    next();
  } catch (error) {
    console.log(error); // It's good practice to log the error
    next();
  }
}

module.exports = defineCurrentUser;
