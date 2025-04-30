import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/product.controllers.js";
import { validate } from "../middleware/validation.middleware.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../validation/product.validation.js";
import { idSchema } from "../validation/common.validation.js";

const productRoutes = express.Router();

productRoutes.post(
  "/create-product",
  validate(createProductSchema),
  createProduct
);
productRoutes.get("/products", getAllProducts);
productRoutes.put(
  "/update-product",
  validate(updateProductSchema),
  updateProduct
);
productRoutes.delete("/delete-product", validate(idSchema),deleteProduct);

export { productRoutes };
