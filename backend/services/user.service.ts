import UserModel from "../models/user.model";
import { redis } from "../utils/redis";
import { Response } from "express";

/* get User By Id  */
export const getUserById = async (id: string) => {
  const userJson = await redis.get(id);

  if (userJson) {
    return JSON.parse(userJson);
  }
  return null;
};

/* get all users */
export const getAllUsersService = async (res: Response) => {
  const users = await UserModel.find().sort({ createdAt: -1 });
  res.status(201).json({
    success: true,
    users,
  });
};

/* update user role */
export const updateUserRoleService = async (
  res: Response,
  id: string,
  role: string
) => {
  const user = await UserModel.findByIdAndUpdate(id, { role }, { new: true });
  res.status(201).json({
    success: true,
    user,
  });
};
