import { NextFunction,Response } from "express";
import { catchAsyncError } from "../middleware/catchAsyncErrors";
import OrderModel from "../models/order.model";

/* create new order */
export const newOrder  = catchAsyncError(async(data:any,next:NextFunction,res:Response)=>{
  const order = await OrderModel.create(data)
  res.status(201).json({
    success: true,
    order
  })
 
})