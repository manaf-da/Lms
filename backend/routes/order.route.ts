import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
import { createOrder, getAdminAllOrders } from '../controllers/order.controller';
const orderRouter = express.Router();

orderRouter.post('/create-order',isAuthenticated,createOrder)
orderRouter.get('/get-orders-admin',isAuthenticated,authorizeRoles('admin'),getAdminAllOrders)

export default orderRouter