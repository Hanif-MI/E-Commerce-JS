import express from "express";
import {
  createCategory,
  getAllCategories,
  deleteCategory,
} from "../controllers/category.controllers.js";
import {
  idSchema,
  nameSchema,
} from "../validation/common.validation.js";
import { validate } from "../middleware/validation.middleware.js";

export const categoryRoute = express.Router();

categoryRoute.post("/create-category", validate(nameSchema), createCategory);
categoryRoute.get("/categories", getAllCategories);
categoryRoute.delete("/delete-category", validate(idSchema), deleteCategory);
