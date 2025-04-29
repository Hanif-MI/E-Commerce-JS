import express from "express";
import {
  createCategory,
  getAllCategories,
} from "../controllers/category.controllers.js";

export const categoryRoute = express.Router();

categoryRoute.post("/create-category", createCategory);
categoryRoute.get("/categories", getAllCategories);
