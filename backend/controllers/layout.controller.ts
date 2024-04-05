import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import LayoutModel from "../models/layout.model";
import  cloudinary  from 'cloudinary';
import { url } from "inspector";


/* create layout */
export const  createLayout = catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {type} =req.body;
        if(type === 'Banner'){
            const {image, title,subTitle} = req.body
            const myCloud = await cloudinary.v2.uploader.upload(image,{
                folder:'layout'
            })
            const banner = {
                image:{
                    public_id:myCloud.public_id,
                    url:myCloud.secure_url,
                },
                title,subTitle
            }
            await LayoutModel.create({banner})
        }

        if(type === 'FAQ'){
            const {faq} =req.body 

            await LayoutModel.create(faq)
        }

        if(type === 'Categories'){
            const {categories} = req.body
            await LayoutModel.create(categories)
        }
        
        res.status(200).json({
            success: true,
            message: 'Layout created successfully'
        })
    } catch (error:any) {
        return next(new ErrorHandler(error.message,500))
        
    }
})