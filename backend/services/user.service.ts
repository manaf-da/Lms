import userModel from "../models/user.model";
import { redis } from "../utils/redis";

/* get User By Id  */
export const getUserById = async (id: string) => {
  const userJson = await redis.get(id);

  if (userJson) {
    return JSON.parse(userJson);
  }
  return null;
};
