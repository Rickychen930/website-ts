import { DeleteResult } from "mongodb";
import { UserModel } from "../models/user-model";
import { IUser } from "../types/user";

export const upsertUserByName = async (
  name: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const result = await UserModel.findOneAndUpdate(
    { name },
    { $set: payload },
    { upsert: true, new: true, runValidators: true }
  ).exec();
  return result as unknown as IUser | null;
};

export const getUserByName = async (name: string): Promise<IUser | null> => {
  return UserModel.findOne({ name }).lean<IUser>().exec();
};

export const deleteUserByName = async (name: string): Promise<DeleteResult> => {
  return UserModel.deleteOne({ name }).exec();
};
