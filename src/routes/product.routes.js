import express from "express";
import {
  createProduct,
  getAllProducts,
  updateProduct
} from "../controllers/product.controllers.js";

const productRoutes = express.Router();

productRoutes.use("/create-product", createProduct);
productRoutes.use("/products", getAllProducts);
productRoutes.use("/update-product", updateProduct);

export { productRoutes };
