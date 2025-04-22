import express from "express";
import { UserController } from "./user.controller";
import { validate } from "../../../middleware/validate.middleware";
import { UserValidation } from "./user.validation";
import { nextAuthProtect } from "../../../middleware/nextauth.middleware";
import auth from "../../../middleware/auth.middleware";

const router = express.Router();

// Public routes
router.post(
  "/register",
  validate(UserValidation.userValidationSchema),
  UserController.register
);
router.post(
  "/login",
  validate(UserValidation.loginValidationSchema),
  UserController.login
);
router.get("/logout", UserController.logout);

// Protected routes - using NextAuth middleware
router.use(nextAuthProtect);
router.get("/profile", UserController.getProfile);
router.put(
  "/profile",
  validate(UserValidation.updateProfileValidationSchema),
  UserController.updateProfile
);
router.post(
  "/change-password",
  validate(UserValidation.passwordChangeValidationSchema),
  UserController.changePassword
);
router.delete("/:id", UserController.deleteUser);
// Admin route to create another admin
router.post(
  "/create-admin",
  auth("admin"), // Ensure only admins can access this route
  validate(UserValidation.userValidationSchema),
  UserController.createAdmin
);

// New public route to get all users
router.get("/all", UserController.getAllUsers);

export const userRouter = router;
