import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { authRoutes } from "./src/routes/auth.routes.js";
import db from "./src/models/index.js";
import { categoryRoute } from "./src/routes/category.routes.js";
import { productRoutes } from "./src/routes/product.routes.js";
import { addressRoutes } from "./src/routes/address.routes.js";
import { cartRoute } from "./src/routes/cart.routes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", authRoutes);
app.use("/api/category", categoryRoute);
app.use("/api/product", productRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/cart", cartRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
