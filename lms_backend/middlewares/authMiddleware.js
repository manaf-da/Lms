const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Authorization header missing or invalid");
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded?.id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    throw new Error("You are not authorized");
  }

  const { email } = req.user;
  const user = await User.findOne({ email: email });

  if (!user || user.roles !== "admin") {
    throw new Error("You are not an admin");
  }

  next();
});
const isInstructor = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    throw new Error("You are not authorized");
  }

  const { email } = req.user;
  const instructor = await User.findOne({ email: email });

  if (!instructor || instructor.roles !== "instructor") {
    throw new Error("You are not an instructor");
  }

  next();
});

module.exports = { isAdmin, authMiddleware, isInstructor };
