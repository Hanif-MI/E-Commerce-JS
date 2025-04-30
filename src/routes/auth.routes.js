import express from "express";
import {
  signUp,
  sendOTP,
  verifyOTP,
  signIn,
  forgetPassword,
  deleteMyAccount,
} from "../controllers/auth.controllers.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { loadUser } from "../middleware/user.middleware.js";
import { validate } from "../middleware/validation.middleware.js";
import {
  otpVerificationSchema,
  signInSchema,
  signUpSchema,
} from "../validation/auth.validation.js";
import { emailSchema } from "../validation/common.validation.js";

const authRoutes = express.Router();

authRoutes.post("/sign-in", validate(signInSchema), signIn);
authRoutes.post("/sign-up", validate(signUpSchema), signUp);
authRoutes.post("/resend-otp", validate(emailSchema), sendOTP);
authRoutes.post("/verify-otp", validate(otpVerificationSchema), verifyOTP);
authRoutes.post("/forget-password", validate(emailSchema), forgetPassword);
authRoutes.delete(
  "/delete-my-account",
  authMiddleware,
  loadUser,
  deleteMyAccount
);

export { authRoutes };
