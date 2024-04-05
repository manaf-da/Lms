import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { getUsersAnalytics } from "../controllers/analytics.controller";
import { getOrdersAnalytics } from "../controllers/order.controller";
import { getCourseAnalytics } from "../controllers/course.controller";
const analyticRouter = express.Router()


analyticRouter.get('/get-users-analytics',isAuthenticated,authorizeRoles('admin'),getUsersAnalytics)

analyticRouter.get('/get-orders-analytics',isAuthenticated,authorizeRoles('admin'),getOrdersAnalytics)

analyticRouter.get('/get-courses-analytics',isAuthenticated,authorizeRoles('admin'),getCourseAnalytics)



export default analyticRouter