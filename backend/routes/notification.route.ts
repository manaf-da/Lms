import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { allNotification, updateNotification } from "../controllers/notification.controller";
const notificationRouter = express.Router();

notificationRouter.get(
  "/get-all-notifications",
  isAuthenticated,
  authorizeRoles("admin"),
  allNotification
);
notificationRouter.put('/update-notification/:id',isAuthenticated,authorizeRoles("admin"),updateNotification)

export default notificationRouter;
