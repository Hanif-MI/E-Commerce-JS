import express from "express";
import {
  createCategory,
  getAllCategories,
} from "../controllers/category.controllers.js";

export const categoryRoute = express.Router();

categoryRoute.use("/create-category", createCategory);
categoryRoute.use("/categories", getAllCategories);
