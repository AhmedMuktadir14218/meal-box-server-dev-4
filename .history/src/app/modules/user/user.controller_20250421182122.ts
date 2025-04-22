import { Request, Response } from "express";
import { UserService } from "./user.service";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { AuthService } from "../auth/auth.service";
import config from "../../config";
import jwt from "jsonwebtoken";
import { Document } from "mongoose";
// Register a new user
// Register a new user
const register = catchAsync(async (req: Request, res: Response) => {
  const { name, email, password, role = "user", phone, address } = req.body;

  // Check if user already exists
  const existingUser = await UserService.findUserByEmail(email);
  if (existingUser) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "Email is already in use",
    });
  }

  // Create new user
  const user = await UserService.register({
    name,
    email,
    password,
    role, // Use the role from the request or default to "user"
    phone,
    address,
  });

  // Remove sensitive information before sending
  const userData = (user as Document).toJSON ? (user as any).toJSON() : { ...user };
  if (userData.password) delete userData.password;

  sendResponse(res, {
    statusCode: 201,
    message: "User registered successfully",
    data: userData,
  });
});
const generateToken = (user: any) => {
  // Debugging: Check configuration values
  console.log('JWT Secret:', config.jwt_secret);
  console.log('JWT Expires In:', config.jwt_expires_in);

  // Debugging: Check user object
  console.log('User ID:', user._id);
  console.log('User Role:', user.role);

  // Ensure config.jwt_expires_in is a string or number
  const expiresIn: string | number = config.jwt_expires_in;
  console.log('Expires In Type:', typeof expiresIn);

  // Generate JWT token
  const token = jwt.sign(
    { id: user._id.toString(), role: user.role },
    config.jwt_secret,
    { expiresIn } // Use the variable with the correct type
  );
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    config.jwt_secret as string,
    { expiresIn: '1d' }
  );

  // Debugging: Check generated token
  console.log('Generated Token:', token);

  return token;
};
// Login user
const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await AuthService.login(email, password);

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Generate token
    const token = generateToken(user);

    // Send response
    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'An unexpected error occurred' });
  }
};


// Get current user profile
const getProfile = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: "You are not authenticated",
    });
  }

  const userId = req.user.id || (req.user._id && req.user._id.toString());

  if (!userId) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: "User ID not found",
    });
  }

  const user = await UserService.findUserById(userId);

  if (!user) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "User not found",
    });
  }

  sendResponse(res, {
    statusCode: 200,
    message: "User profile retrieved successfully",
    data: user,
  });
});

// Update user profile
const updateProfile = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: "You are not authenticated",
    });
  }

  const userId = req.user.id || (req.user._id && req.user._id.toString());

  if (!userId) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: "User ID not found",
    });
  }

  const updatedUser = await UserService.updateUser(userId, req.body);

  sendResponse(res, {
    statusCode: 200,
    message: "Profile updated successfully",
    data: updatedUser,
  });
});

// Change password
const changePassword = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: "You are not authenticated",
    });
  }

  const userId = req.user.id || (req.user._id && req.user._id.toString());

  if (!userId) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: "User ID not found",
    });
  }

  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "Both current password and new password are required",
    });
  }

  try {
    const result = await UserService.changePassword(userId, {
      currentPassword,
      newPassword,
    });

    sendResponse(res, {
      statusCode: 200,
      message: "Password changed successfully",
      data: result,
    });
  } catch (error) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to change password",
    });
  }
});

// Delete user
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "User ID is required",
    });
  }

  try {
    const result = await UserService.deleteUser(id);

    sendResponse(res, {
      statusCode: 200,
      message: "User deleted successfully",
      data: result,
    });
  } catch (error) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error instanceof Error ? error.message : "Failed to delete user",
    });
  }
});

// Logout user
const logout = catchAsync(async (req: Request, res: Response) => {
  // Clear token cookie
  res.clearCookie("token");

  sendResponse(res, {
    statusCode: 200,
    message: "Logged out successfully",
  });
});
// Create a new admin user
// Create a new admin user
const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { name, email, password, phone, address } = req.body;

  // Check if user already exists
  const existingUser = await UserService.findUserByEmail(email);
  if (existingUser) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "Email is already in use",
    });
  }

  // Create new admin user
  const user = await UserService.register({
    name,
    email,
    password,
    role: "admin", // This should now be valid
    phone,
    address,
  });

  // Remove sensitive information before sending
  const userData = (user as Document).toJSON ? (user as any).toJSON() : { ...user };
  if (userData.password) delete userData.password;

  sendResponse(res, {
    statusCode: 201,
    message: "Admin user created successfully",
    data: userData,
  });
});


export const UserController = {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  deleteUser,
  logout,
  createAdmin
};
