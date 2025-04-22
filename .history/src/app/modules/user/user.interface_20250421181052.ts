import { Types } from "mongoose";
import { USER_ROLE } from "./user.constants";

export type UserRole = "customer" | "provider" | "admin"; // Added "admin" role

import { Document, Types } from "mongoose";

export interface TUser extends Document{
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone?: string;
  password?: string;
  photo?: string;
  address?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  comparePassword?(candidatePassword: string): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;

export interface TUserRegistration {
  name: string;
  email: string;
  password: string;
  role: UserRole; // Ensure this is using the UserRole type
  phone?: string;
  address?: string;
}