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
    const createUser = await User.create(req.body);
    res.status(200).json({
      status: true,
      message: "User Created successfully",
      createUser,
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
    const getUsers = await User.find();
    res.status(200).json({
      status: true,
      message: "All User Fetched successfully",
      getUsers,
    });
  } catch (error) {
    throw new Error(error);
  }
});

/* Update a user profile */
const updateUser = asyncHandler((req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
});

module.exports = { createAUser, loginAUser, getAllUsers };
