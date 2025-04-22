import { User, IUser } from "./user.model";
import { TUser, TUserRegistration } from "./user.interface";
import { Response } from "express";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import config from "../../../app/config";
const getAllUsers = async (): Promise<TUser[]> => {
  return await User.find().select('-password'); // Exclude passwords
};
const register = async (userData: TUserRegistration): Promise<TUser> => {
  const user = await User.create(userData);
  return user;
};

const findUserByEmail = async (email: string): Promise<TUser | null> => {
  return await User.findOne({ email }).select("+password");
};

const findUserById = async (id: string): Promise<TUser | null> => {
  return await User.findById(id);
};

const updateUser = async (
  userId: string,
  userData: Partial<TUser>
): Promise<TUser | null> => {
  // Create an updateable object with only the fields we want to allow updating
  const updateData: Partial<TUser> = {};

  // Only copy allowed fields
  if (userData.name) updateData.name = userData.name;
  if (userData.phone) updateData.phone = userData.phone;
  if ("photo" in userData) updateData.photo = userData.photo;

  const result = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new Error("User not found");
  }

  return result;
};

const comparePasswords = async (
  user: TUser,
  candidatePassword: string
): Promise<boolean> => {
  return await (user as IUser).comparePassword(candidatePassword);
};

const sendUserResponse = (
  user: TUser,
  statusCode: number,
  res: Response
): void => {
  // Convert user to plain object if needed
  const userData = (user as any).toJSON ? (user as any).toJSON() : user;

  // Remove password from response
  if (userData.password) delete userData.password;

  // Send response
  res.status(statusCode).json({
    status: "success",
    message: "Operation successful",
    data: userData,
  });
};

const deleteUser = async (id: string) => {
  // Check if id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid user ID format");
  }

  try {
    const result = await User.findByIdAndDelete(id);

    if (!result) {
      throw new Error("User not found or already deleted");
    }

    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to delete user");
  }
};

const changePassword = async (
  userId: string,
  {
    currentPassword,
    newPassword,
  }: { currentPassword: string; newPassword: string }
) => {
  // Find user with password
  const user = await User.findById(userId).select("+password");
  if (!user) {
    throw new Error("User not found");
  }

  // Verify current password
  const isPasswordMatch = await comparePasswords(user, currentPassword);
  if (!isPasswordMatch) {
    throw new Error("Current password is incorrect");
  }

  // Update directly to avoid pre-save hook
  await User.updateOne(
    { _id: userId },
    {
      $set: {
        password: await bcrypt.hash(
          newPassword,
          Number(config.bcrypt_salt_rounds || 10)
        ),
      },
    }
  );

  return { success: true };
};

export const UserService = {
  register,
  findUserByEmail,
  findUserById,
  updateUser,
  comparePasswords,
  sendUserResponse,
  deleteUser,
  changePassword,
  getAllUsers 
};
