import express from "express";
import { test } from "../controllers/user.controllers.js";

const userRoutes = express.Router();

userRoutes.use("/", test);

export { userRoutes };
