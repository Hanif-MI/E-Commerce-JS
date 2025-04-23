import express from "express";
import { signUp , sendOTP, verifyOTP, signIn, forgetPassword} from "../controllers/auth.controllers.js";

const authRoutes = express.Router();


/**
 * TODO : Query is that how my api work with use instead of setting the explicitly set type
 */
authRoutes.use("/sign-in", signIn);
authRoutes.use("/sign-up", signUp);
authRoutes.use("/resend-otp", sendOTP);
authRoutes.use("/verify-otp", verifyOTP);
authRoutes.use("/forget-password", forgetPassword);

export { authRoutes };
