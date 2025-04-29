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

const authRoutes = express.Router();

authRoutes.post("/sign-in", signIn);
authRoutes.post("/sign-up", signUp);
authRoutes.post("/resend-otp", sendOTP);
authRoutes.post("/verify-otp", verifyOTP);
authRoutes.post("/forget-password", forgetPassword);
authRoutes.delete("/delete-my-account", authMiddleware, loadUser, deleteMyAccount);

export { authRoutes };
