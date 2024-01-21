require("dotenv").config();
import { Request, Response, NextFunction } from "express";
import User, { IUser } from "./../models/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import { catchAsyncError } from "../middleware/catchAsyncErrors";
import jwt, { Secret } from "jsonwebtoken";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMail";

interface IRegistrationBody {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export const registrationUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password, avatar } = req.body;

      const emailAvailable = await User.findOne({ email });
      if (emailAvailable) {
        return next(new ErrorHandler("Email is already taken   ", 400));
      }

      const user: IRegistrationBody = {
        name,
        email,
        password,
      };
      /* The line `const activationToken = createActivationToken(user);` is calling the
      `createActivationToken` function and passing the `user` object as an argument. The
      `createActivationToken` function generates an activation code and creates a JSON Web Token
      (JWT) using the `jsonwebtoken` library. The function returns an object containing the
      generated token and activation code. The `activationToken` variable is assigned this returned
      object. */
      const activationToken = createActivationToken(user);

      /* The line `const activationCode = activationToken.activationCode;` is extracting the
      `activationCode` property from the `activationToken` object and assigning it to the
      `activationCode` variable. This allows you to access the activation code separately from the
      token. */
      const activationCode = activationToken.activationCode;

      const data = { user: { name: user.name }, activationCode };
      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/activation_mail.ejs"),
        data
      );
      try {
        await sendMail({
          email: user.email,
          subject: "Activate your account",
          template: "activation_mail.ejs",
          data,
        });

        res.status(201).json({
          success: true,
          message: `Please  check your email : ${user.email} to activate your account!`,
          activationToken: activationToken.token,
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

interface IActivationToken {
  token: string;
  activationCode: string;
}

export const createActivationToken = (user: any): IActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

  const token = jwt.sign(
    {
      user,
      activationCode,
    },
    process.env.ACTIVATION_SECRET_KEY as Secret,
    {
      expiresIn: "5m",
    }
  );
  return {
    token,
    activationCode,
  };
};
