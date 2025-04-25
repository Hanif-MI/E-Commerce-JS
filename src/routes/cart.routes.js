import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { loadUser } from "../middleware/user.middleware.js";
import {
  addToCart,
  getUserCart,
  updateCartStatus,
} from "../controllers/cart.controllers.js";

const cartRoute = express.Router();

cartRoute.use("/add-to-cart", authMiddleware, loadUser, addToCart);
cartRoute.use(
  "/update-cart-status",
  authMiddleware,
  loadUser,
  updateCartStatus
);
cartRoute.use("/get-user-cart", authMiddleware, loadUser, getUserCart);

export { cartRoute };
