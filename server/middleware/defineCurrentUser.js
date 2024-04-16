const db = require("../models")
const jwt = require('json-web-token')

const { User } = db;

async function defineCurrentUser(req, res, next) {
  if (!req.headers.authorization) return next();

  const [bearer, token] = req.headers.authorization.split(" ");
  if (bearer !== "Bearer") return next();

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    req.currentUser = await User.findById(userId);
    next();
  } catch (error) {
    next();
  }
}

module.exports = defineCurrentUser
