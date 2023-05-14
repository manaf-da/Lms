const express = require("express");
const {
  createAUser,
  loginAUser,
  getAllUsers,
} = require("../controllers/userController");
const { isAdmin } = require("../middlewares/authMiddleware");
const userRouter = express.Router();

/*post routes */
userRouter.post("/register", createAUser);
userRouter.post("/login", loginAUser);

/* get routes */
userRouter.get("/all-users", isAdmin, getAllUsers);

module.exports = userRouter;
