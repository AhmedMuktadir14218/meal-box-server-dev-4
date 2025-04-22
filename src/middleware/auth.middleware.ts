import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../utils/catchAsync";
import { verifyToken } from "../utils/jwt";
import config from "../app/config";
import { User } from "../app/modules/user/user.model";
import { TUserRole } from "../app/modules/user/user.interface";
import jwt from "jsonwebtoken";
// Auth middleware to protect routes
export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;

    // Check authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    console.log("Token received:", token); // Debugging line

    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "You are not logged in! Please log in to get access.",
      });
    }

    // Verify token
    const decoded = verifyToken(token);
    console.log("Decoded token:", decoded); // Debugging line

    // Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: "fail",
        message: "The user belonging to this token no longer exists.",
      });
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = decoded;
    next();
  }
);

// Role-based authorization middleware
const auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        status: "fail",
        message: "You are not authorized!",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, config.jwt_secret) as { id: string; role: string };

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "This user is not found!",
      });
    }

    if (requiredRoles.length && !requiredRoles.includes(decoded.role)) {
      return res.status(403).json({
        status: "fail",
        message: "You do not have permission to perform this action",
      });
    }

    req.user = {
      id: user._id.toString(),
      role: user.role,
    };

    next();
  });
};

export default auth;
