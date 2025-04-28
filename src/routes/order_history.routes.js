import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { loadUser } from "../middleware/user.middleware.js";
import {
  addOrder,
  getOrderList,
  updateOrderStatus,
} from "../controllers/order_history.controllers.js";

const orderHistoryRoute = express.Router();

orderHistoryRoute.use("/add-order", authMiddleware, loadUser, addOrder);
orderHistoryRoute.use(
  "/get-order-list",
  authMiddleware,
  loadUser,
  getOrderList
);
orderHistoryRoute.use("/update-order-status", updateOrderStatus); /// authMiddleware, loadUser,

export default orderHistoryRoute;
