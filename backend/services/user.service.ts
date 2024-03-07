import userModel from "../models/user.model";

/* get User By Id  */

export const getUserById = async (id: string) => {
  const user = await userModel.findById(id);
  return user;
};
