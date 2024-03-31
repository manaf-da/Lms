import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import {
  addAnswer,
  addQuestion,
  addReview,
  allCourses,
  editCourse,
  getCourseByValidUser,
  replyToReview,
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
courseRouter.get("/get-Courses", allCourses);
courseRouter.get(
  "/get-course-content/:id",
  isAuthenticated,
  getCourseByValidUser
);
courseRouter.put("/add-question", isAuthenticated, addQuestion);
courseRouter.put("/add-answer", isAuthenticated, addAnswer);
courseRouter.put("/add-review/:id", isAuthenticated, addReview);
courseRouter.put("/add-replyReview", isAuthenticated,authorizeRoles("admin"), replyToReview);

export default courseRouter;
