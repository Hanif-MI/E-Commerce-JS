import express from "express";
import {
  createProduct,
  deleteProduct,
  deleteProductMedia,
  getAllProducts,
  updateProduct,
  updateProductMedia,
  uploadMediaProduct,
} from "../controllers/product.controllers.js";
import { validate, ValidationTarget } from "../middleware/validation.middleware.js";
import {
  createProductSchema,
  getProductSchema,
  productIdSchema,
  updateProductSchema,
} from "../validation/product.validation.js";
import { idSchema } from "../validation/common.validation.js";
import { uploadSingleMediaMiddleware } from "../middleware/media.middleware.js";

const productRoutes = express.Router();

productRoutes.post(
  "/create-product",
  validate(createProductSchema),
  createProduct
);
productRoutes.get("/products", validate(getProductSchema,ValidationTarget.QUERY), getAllProducts);
productRoutes.put(
  "/update-product",
  validate(updateProductSchema),
  updateProduct
);
productRoutes.delete("/delete-product", validate(idSchema), deleteProduct);

productRoutes.post(
  "/upload-media",
  uploadSingleMediaMiddleware,
  validate(productIdSchema),
  uploadMediaProduct
);

productRoutes.put(
  "/update-media",
  uploadSingleMediaMiddleware,
  validate(idSchema),
  updateProductMedia
);

productRoutes.delete("/delete-media", validate(idSchema), deleteProductMedia);

export { productRoutes };
