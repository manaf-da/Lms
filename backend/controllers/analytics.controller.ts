
import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import { generatePrevious12MonthsData } from "../utils/analytics.generator";
import UserModel from "../models/user.model"

/* get user analytics  -- only the user */
export const getUsersAnalytics = catchAsyncError(async(req: Request, res: Response,next: NextFunction)=>{
    try {
        
        const users  = await generatePrevious12MonthsData(UserModel)

        res.status(200).json({
            success:true,
            users
        })
    } catch (error:any) {
        return next (new ErrorHandler(error.message,500))
        
    }
})