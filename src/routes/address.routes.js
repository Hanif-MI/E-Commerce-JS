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
import { validate } from "../middleware/validation.middleware.js";
import {
  createAddressSchema,
  updateAddressSchema,
} from "../validation/address.validation.js";
import { idSchema } from "../validation/common.validation.js";

const addressRoutes = express.Router();

addressRoutes.post(
  "/create-address",
  authMiddleware,
  loadUser,
  validate(createAddressSchema),
  createAddress
);

addressRoutes.put(
  "/update-address",
  authMiddleware,
  loadUser,
  validate(updateAddressSchema),
  updateAddress
);

addressRoutes.get(
  "/get-address-by-user",
  authMiddleware,
  loadUser,
  getAddressByID
);

addressRoutes.put(
  "/make-address-default-validation",
  authMiddleware,
  loadUser,
  validate(idSchema),
  makeAddressDefault
);

addressRoutes.delete(
  "/delete-address",
  authMiddleware,
  validate(idSchema),
  deleteAddress
);

export { addressRoutes };
