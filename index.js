import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { errorHandler } from "./src/middleware/error.middleware.js";
import route from "./src/routes/index.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api",route)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
