import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct
} from "../controllers/product.controllers.js";

const productRoutes = express.Router();

productRoutes.post("/create-product", createProduct);
productRoutes.get("/products", getAllProducts);
productRoutes.put("/update-product", updateProduct);
productRoutes.delete("/delete-product", deleteProduct);

export { productRoutes };
