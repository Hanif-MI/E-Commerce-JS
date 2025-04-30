import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { loadUser } from "../middleware/user.middleware.js";
import {
  addToCart,
  getUserCart,
  removeProductFromCart
} from "../controllers/cart.controllers.js";

const cartRoute = express.Router();

cartRoute.post("/add-to-cart", authMiddleware, loadUser, addToCart);
cartRoute.get("/get-user-cart", authMiddleware, loadUser, getUserCart);
cartRoute.delete("/remove-product-from-cart", authMiddleware, loadUser, removeProductFromCart);

export { cartRoute };
