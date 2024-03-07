import { IUser } from "../models/user.model";

declare module "express" {
  interface Request {
    user?: IUser;
  }
}
