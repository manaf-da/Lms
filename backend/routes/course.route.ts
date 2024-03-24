import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import {
  addAnswer,
  addQuestion,
  addReview,
  allCourse,
  editCourse,
  getCourseByValidUser,
  uploadCourse,
} from "../controllers/course.controller";
import { singleCourse } from "./../controllers/course.controller";
const courseRouter = express.Router();

courseRouter.post(
  "/create-course",
  isAuthenticated,
  authorizeRoles("admin"),
  uploadCourse
);
courseRouter.put(
  "/edit-course/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  editCourse
);
courseRouter.get("/get-course/:id", singleCourse);
courseRouter.get("/get-Courses", allCourse);
courseRouter.get(
  "/get-Course-content/:id",
  isAuthenticated,
  getCourseByValidUser
);
courseRouter.put("/add-question", isAuthenticated, addQuestion);
courseRouter.put("/add-answer", isAuthenticated, addAnswer);
courseRouter.put("/add-review/:id", isAuthenticated, addReview);

export default courseRouter;
