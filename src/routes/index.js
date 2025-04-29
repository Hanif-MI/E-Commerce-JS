import express from "express";
import { categoryRoute } from "./category.routes.js";
import { productRoutes } from "./product.routes.js";
import { addressRoutes } from "./address.routes.js";
import { cartRoute } from "./cart.routes.js";
import orderHistoryRoute from "./order_history.routes.js";
import { authRoutes } from "./auth.routes.js";

const route = express.Router();

route.use("/users", authRoutes);
route.use("/category", categoryRoute);
route.use("/product", productRoutes);
route.use("/address", addressRoutes);
route.use("/cart", cartRoute);
route.use("/order-history", orderHistoryRoute);

export default route;
