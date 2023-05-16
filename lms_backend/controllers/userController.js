const { generateToken } = require("../config/jwtToken");
const validateMongoDbId = require("../config/validateMongoDbId");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

/*  */

const createAUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  /* Find the user with this email get from req.body */
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    /* create a new user */
    const user = await User.create(req.body);
    res.status(200).json({
      status: true,
      message: "User Created successfully",
      user,
    });
  } else {
    throw new Error(`User ${req.body} already exists!`);
  }
});

/* Login a user */
const loginAUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  /* check if user exists or not */
  const findUser = await User.findOne({ email: email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    res.status(200).json({
      status: true,
      message: "logged in successfully",
      token: generateToken(findUser?._id),
      role: findUser?.roles,
      username: findUser?.firstname + " " + findUser?.lastname,
      user_image: findUser?.user_image,
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

/* Get all users */
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json({
      status: true,
      message: "All User Fetched successfully",
      user,
    });
  } catch (error) {
    throw new Error(error);
  }
});
/* Get a single user  */
const getSingleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const user = await User.findById(id);
    res.status(200).json({
      status: true,
      message: "Single user found successfully",
      user,
    });
  } catch (error) {}
});

/* Update a user profile */
const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const user = await User.findByIdAndUpdate(_id, req.body, { new: true });
    res.json(200).json({
      status: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    throw new Error(error);
  }
});

/* Delete a user */
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const user = await User.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createAUser,
  loginAUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
