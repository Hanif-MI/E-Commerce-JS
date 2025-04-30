import {
  errorResponseWithoutData,
  successResponseData,
  successResponseWithoutData,
} from "../utility/response.js";
import { RESPONSE_CODE } from "../utility/constant.js";
import Models from "../models/index.js";
import { errorMessages, successMessages } from "../utility/messages.js";

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
    if (!product_id)
      return errorResponseWithoutData(
        res,
        RESPONSE_CODE.BAD_REQUEST,
        errorMessages.PRODUCT_ID_NOT_FOUND
      );

    const productModel = Models.Product;
    const p = await productModel.findOne({ where: { id: product_id } });

    if (!p)
      return errorResponseWithoutData(
        res,
        RESPONSE_CODE.FORBIDDEN,
        errorMessages.PRODUCT_NOT_FOUND
      );

    const model = Models.Cart;
    const product = await model.findOne({ where: { product_id } });
    if (product)
      return errorResponseWithoutData(
        res,
        RESPONSE_CODE.FORBIDDEN,
        errorMessages.PRODUCT_ALREADY_IN_CART
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
      successMessages.ADD_ITEM_IN_CART_SUCCESS
    );
  } catch (error) {
    errorResponseWithoutData(
      res,
      RESPONSE_CODE.INTERNAL_SERVER,
      errorMessages.INTERNAL_SERVER_ERROR
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
      errorMessages.INTERNAL_SERVER_ERROR
    );
  }
};

const removeProductFromCart = async (req, res) => {
  /**
   * Steps for remove the item from the cart.
   *  1. Validate the request body.
   *  2. Check for product exists in cart.
   *  3. update in database.
   *  4. send response
   *  5. handle errors
   *  6. test endpoint
   */

  try {
    const { id } = req.body;
    if (!id)
      return errorResponseWithoutData(
        res,
        RESPONSE_CODE.BAD_REQUEST,
        errorMessages.VALID_CART_ID
      );

    const model = Models.Cart;

    const p = await model.findOne({ where: { id } });

    if (!p)
      return errorResponseWithoutData(
        res,
        RESPONSE_CODE.FORBIDDEN,
        errorMessages.CART_NOT_FOUND
      );

    await model.destroy({ where: { id } });
    return successResponseWithoutData(
      res,
      RESPONSE_CODE.SUCCESS_NEW_RESOURCE,
      successMessages.PRODUCT_REMOVE_FROM_CART
    );
  } catch (error) {
    errorResponseWithoutData(
      res,
      RESPONSE_CODE.INTERNAL_SERVER,
      errorMessages.INTERNAL_SERVER_ERROR
    );
  }
};

export { addToCart, getUserCart, removeProductFromCart };
