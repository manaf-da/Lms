import express from "express";
import {
  activateUser,
  registrationUser,
  loginUser,
  logoutUser,
  updateAccessToken,
  getUserInfo,
  socialAuth,
  updateUserInfo,
  updatePassword,
  updateProfilePicture,
  getAdminAllUsers,
  deleteUser,
} from "../controllers/user.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { updateUserRole } from './../controllers/user.controller';
const userRouter = express.Router();

userRouter.post("/registration", registrationUser);
userRouter.post("/activate_user", activateUser);
userRouter.post("/login", loginUser);
userRouter.post("/social-auth", socialAuth);

userRouter.get("/logout", isAuthenticated, logoutUser);
userRouter.get("/refresh", updateAccessToken);
userRouter.get("/me", isAuthenticated, getUserInfo);
userRouter.get('/get-users-admin',isAuthenticated,authorizeRoles('admin'),getAdminAllUsers)

userRouter.put("/update-user-info", isAuthenticated, updateUserInfo);
userRouter.put("/update-user-password", isAuthenticated, updatePassword);
userRouter.put("/update-user-avatar", isAuthenticated, updateProfilePicture);
userRouter.put('/update-user-role',isAuthenticated,authorizeRoles('admin'),updateUserRole)

userRouter.delete('/delete-user/:id',isAuthenticated,authorizeRoles('admin'),deleteUser)

export default userRouter;
