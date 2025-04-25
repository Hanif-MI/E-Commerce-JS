import {
  errorResponseWithoutData,
  successResponseData,
} from "../utility/response.js";
import { RESPONSE_CODE } from "../utility/constant.js";
import Models from "../models/index.js";
import { updateCartValidation } from "../validatons/cart.validation.js";
import { where } from "sequelize";

const addToCart = async (req, res) => {
  /**
   * Steps to add product in cart
   * 1.validate the request body.
   * 2.Check for product exists.
   * 3.Check for the if product already in cart.
   * 4.insert in database.
   * 5.send response
   * 6.handle errors
   * 7.test endpoint
   */
  try {
    const { product_id } = req.body;
    const user = req.user;
    console.log("product_id", product_id);
    if (!product_id)
      return errorResponseWithoutData(
        res,
        RESPONSE_CODE.BAD_REQUEST,
        "Product enter the product id"
      );

    const productModel = Models.Product;
    const p = await productModel.findOne({ where: { id: product_id } });

    if (!p)
      return errorResponseWithoutData(
        res,
        RESPONSE_CODE.FORBIDDEN,
        "Product not found"
      );

    const model = Models.Cart;
    const product = await model.findOne({ where: { product_id } });
    if (product)
      return errorResponseWithoutData(
        res,
        RESPONSE_CODE.FORBIDDEN,
        "Product already in cart."
      );
    const newProduct = await model.create({
      product_id,
      user_id: user.id,
      quantity: 1,
    });
    return successResponseData(
      res,
      newProduct,
      RESPONSE_CODE.SUCCESS,
      "Product add in successfully in your cart"
    );
  } catch (error) {
    errorResponseWithoutData(
      res,
      RESPONSE_CODE.INTERNAL_SERVER,
      "Error while adding product into cart. " + error
    );
  }
};

const updateCartStatus = async (req, res) => {
  /**
   * Steps for update the status of cart product.
   * 1. validate the request body.
   * 2. Check for the product exists
   * 3. Update the status in database
   * 4. send response
   * 5. handle error
   * 6. test endpoint
   */
  try {
    return updateCartValidation(req, res, async (isValid) => {
      if (!isValid)
        errorResponseData(res, RESPONSE_CODE.BAD_REQUEST, "Validation failed");

      const { id, status } = req.body;
      const model = Models.Cart;

      const product = await model.findOne({ where: { id } });
      if (!product) {
        return errorResponseWithoutData(
          res,
          RESPONSE_CODE.BAD_REQUEST,
          "Card product is not found!"
        );
      }

      if (status === product.status) {
        return errorResponseWithoutData(
          res,
          RESPONSE_CODE.BAD_REQUEST,
          "Already have the updated status"
        );
      }
      const updatedProduct = await model.update({ status }, { where: { id } });
      return successResponseData(
        res,
        updatedProduct,
        RESPONSE_CODE.SUCCESS_NEW_RESOURCE,
        "Product status update successfully."
      );
    });
  } catch (error) {
    errorResponseWithoutData(
      res,
      RESPONSE_CODE.INTERNAL_SERVER,
      "Error while adding product into cart. " + error
    );
  }
};

const getUserCart = async (req, res) => {
  /**
   * Steps for user cart.
   * 1. Check for user cart.
   * 2. Send the response.
   * 3. handle error
   * 6. test endpoint
   */
  try {
    const { id } = req.user;
    const model = Models.Cart;
    const userCart = await model.findAll({ where: { user_id: id } });
    successResponseData(res, userCart, RESPONSE_CODE.SUCCESS);
  } catch (error) {
    errorResponseWithoutData(
      res,
      RESPONSE_CODE.INTERNAL_SERVER,
      "Error while getting user cart. " + error
    );
  }
};

export { addToCart, updateCartStatus, getUserCart };
