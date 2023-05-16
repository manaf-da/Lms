const express = require("express");
const {
  createAUser,
  loginAUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const userRouter = express.Router();

/*post routes */
userRouter.post("/register", createAUser);
userRouter.post("/login", loginAUser);

/* get routes */
userRouter.get("/all-users", isAdmin, getAllUsers);

/* put routes */
userRouter.put("/update-profile", authMiddleware, updateUser);

/* delete a user */
userRouter.delete("/:id", authMiddleware, isAdmin, deleteUser);

module.exports = userRouter;
