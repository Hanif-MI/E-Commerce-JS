import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { userRoutes } from "./src/routes/user.routes.js";
import db from "./src/models/index.js";
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);

db.sequelize
  .sync()
  .then(() => {
    // wrapping the server in sequelize ORM to make DB Requests
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error while starting server:", error);
  });
