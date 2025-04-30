import express from "express";
import {
  createProduct,
  getAllProducts,
  updateProduct
} from "../controllers/product.controllers.js";

const productRoutes = express.Router();

productRoutes.post("/create-product", createProduct);
productRoutes.get("/products", getAllProducts);
productRoutes.put("/update-product", updateProduct);

export { productRoutes };
