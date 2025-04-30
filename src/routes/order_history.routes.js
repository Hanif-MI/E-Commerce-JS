import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { loadUser } from "../middleware/user.middleware.js";
import {
  addOrder,
  getOrderList,
  updateOrderStatus,
} from "../controllers/order_history.controllers.js";
import { validate } from "../middleware/validation.middleware.js";
import { addOrderHistorySchema } from "../validation/order_history.validation.js";

const orderHistoryRoute = express.Router();

orderHistoryRoute.get("/add-order", authMiddleware, loadUser, addOrder);
orderHistoryRoute.get(
  "/get-order-list",
  authMiddleware,
  loadUser,
  getOrderList
);
orderHistoryRoute.put("/update-order-status", validate(addOrderHistorySchema),updateOrderStatus); /// authMiddleware, loadUser,

export default orderHistoryRoute;
