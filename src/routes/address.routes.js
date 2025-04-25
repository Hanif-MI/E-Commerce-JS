import express from "express";
import { createAddress, getAddressByID, makeAddressDefault, updateAddress } from "../controllers/address.controllers.js";

const addressRoutes = express.Router();

addressRoutes.use("/create-address", createAddress);
addressRoutes.use("/update-address", updateAddress);
addressRoutes.use("/get-address-by-id", getAddressByID);
addressRoutes.use("/make-address-default-validation", makeAddressDefault);

export { addressRoutes };
