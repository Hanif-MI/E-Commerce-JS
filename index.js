import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { authRoutes } from "./src/routes/auth.routes.js";
import db from "./src/models/index.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
