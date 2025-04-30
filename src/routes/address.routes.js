import express from "express";
import {
  createAddress,
  deleteAddress,
  getAddressByID,
  makeAddressDefault,
  updateAddress,
} from "../controllers/address.controllers.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { loadUser } from "../middleware/user.middleware.js";

const addressRoutes = express.Router();

addressRoutes.post("/create-address", authMiddleware, loadUser, createAddress);
addressRoutes.put("/update-address", authMiddleware, loadUser, updateAddress);
addressRoutes.get("/get-address-by-user", authMiddleware, loadUser, getAddressByID);
addressRoutes.put("/make-address-default-validation", authMiddleware, loadUser, makeAddressDefault);
addressRoutes.delete("/delete-address", authMiddleware, deleteAddress);

export { addressRoutes };
