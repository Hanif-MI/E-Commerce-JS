import Models from "../models/index.js";
import {
  errorResponseData,
  errorResponseWithoutData,
  successResponseData,
  successResponseWithoutData,
} from "../utility/response.js";
import { RESPONSE_CODE } from "../utility/constant.js";
import { errorMessages, successMessages } from "../utility/messages.js";
/**
 * This function is responsible for the creating product.
 */
const createProduct = async (req, res) => {
  /**
   * Steps to create the category
   * 1. validate the request body.
   * 2. check inserted category exists or not.
   * 3. insert in to the database
   * 4. Send a response
   * 5. Handle errors
   * 6. Test the endpoint
   */
  try {
    const model = Models.Product;
    const { name, description, price, category_id } = req.body;

    const categoryModel = Models.Category;
    const isCategoryExists = await categoryModel.findOne({
      where: { id: category_id },
    });
    if (!isCategoryExists) {
      return errorResponseData(
        res,
        RESPONSE_CODE.BAD_REQUEST,
        errorMessages.INVALID_CATEGORY
      );
    }

    const isProductExists = await model.findOne({
      where: { name, description, price },
    });

    if (isProductExists) {
      return errorResponseData(
        res,
        RESPONSE_CODE.FORBIDDEN,
        errorMessages.PRODUCT_EXISTS
      );
    }

    const product = await model.create({
      name,
      description,
      price,
      category_id,
    });
    successResponseData(
      res,
      product,
      RESPONSE_CODE.SUCCESS,
      successMessages.PRODUCT_CREATE_SUCCESS
    );
  } catch (error) {
    errorResponseData(
      res,
      RESPONSE_CODE.INTERNAL_SERVER,
      errorMessages.INTERNAL_SERVER_ERROR
    );
  }
};

const updateProduct = async (req, res) => {
  /**
   * Steps to update the product.
   * 1. Validate the request body.
   * 2. Update into the database.
   * 3. send a response
   * 4. Handle errors
   * 5. Test the endpoint
   */

  try {
    const { id, name, description, price, category_id } = req.body;

    const categoryModel = Models.Category;
    const isCategoryExists = await categoryModel.findOne({
      where: { id: category_id },
    });
    if (!isCategoryExists) {
      return errorResponseData(
        res,
        RESPONSE_CODE.BAD_REQUEST,
        "Please insert the valid category."
      );
    }
    const model = Models.Product;
    const product = await model.findOne({ where: { id } });
    if (!product) {
      return errorResponseData(
        res,
        RESPONSE_CODE.BAD_REQUEST,
        errorMessages.PRODUCT_NOT_FOUND
      );
    }
    const updatedProduct = await product.update(
      { name, description, price, category_id },
      {
        where: {
          id,
        },
      }
    );
    console.log(updatedProduct);
    successResponseData(
      res,
      updatedProduct,
      RESPONSE_CODE.SUCCESS,
      successMessages.PRODUCT_UPDATE_SUCCESS
    );
  } catch (error) {
    errorResponseData(
      res,
      RESPONSE_CODE.INTERNAL_SERVER,
      errorMessages.INTERNAL_SERVER_ERROR
    );
  }
};

const getAllProducts = async (req, res) => {
  /**
   * Steps to get all Products.
   * -> get all products from the db
   * -> Send a response
   * -> Handle errors
   * -> Test the endpoint
   */

  let whereCondition = {};
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 10;

  if (req.query.category_id) {
    whereCondition = { category_id: req.query.category_id };
  }

  try {
    const model = Models.Product;

    const products = await model.findAndCountAll({
      where: whereCondition,
      offset: offset,
      limit: limit,
      include: [
        {
          model: Models.product_media,
          as: "product_media",
          attributes: ["fileName", "fileType", "fileSize"],
        },
      ],
    });
    successResponseData(res, products, RESPONSE_CODE.SUCCESS);
  } catch (error) {
    errorResponseData(
      res,
      RESPONSE_CODE.INTERNAL_SERVER,
      errorMessages.INTERNAL_SERVER_ERROR
    );
  }
};

const deleteProduct = async (req, res) => {
  /**
   * Steps to create the category
   * 1. validate the request body.
   * 2. check product is exists.
   * 3. delete from the database
   * 4. Send a response
   * 5. Handle errors
   * 6. Test the endpoint
   */

  try {
    const { id } = req.body;
    const model = Models.Product;
    const product = await model.findOne({ where: { id } });
    if (!product) {
      return errorResponseData(
        res,
        RESPONSE_CODE.BAD_REQUEST,
        errorMessages.PRODUCT_NOT_FOUND
      );
    }
    await model.destroy({ where: { id } });
    return successResponseWithoutData(
      res,
      RESPONSE_CODE.SUCCESS_WITHOUT_RESPONSE,
      successMessages.CATEGORY_DELETE_SUCCESS
    );
  } catch (error) {
    errorResponseData(
      res,
      RESPONSE_CODE.INTERNAL_SERVER,
      errorMessages.INTERNAL_SERVER_ERROR
    );
  }
};

const uploadMediaProduct = async (req, res) => {
  if (req.file && req.file.filename) {
    const model = Models.product_media;
    await model.create({
      fileName: req.file.filename,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
      productId: req.body.productId,
    });
    return successResponseWithoutData(
      res,
      RESPONSE_CODE.SUCCESS_WITHOUT_RESPONSE,
      successMessages.PRODUCT_IMAGE_UPLOAD_SUCCESS
    );
  } else {
    errorResponseData(
      res,
      RESPONSE_CODE.BAD_REQUEST,
      errorMessages.PRODUCT_MEDIA_UPLOADING_FAILED
    );
  }
};

const deleteProductMedia = async (req, res) => {
  try {
    const id = req.body.id;
    const model = Models.product_media;
    const mediaExists = await model.findOne({ where: { id } });
    if (!mediaExists) {
      return errorResponseWithoutData(
        res,
        RESPONSE_CODE.NOT_FOUND,
        errorMessages.PRODUCT__MEDIA_NOT_FOUND
      );
    }
    await model.destroy({ where: { id } });
    return successResponseWithoutData(
      res,
      RESPONSE_CODE.SUCCESS,
      successMessages.PRODUCT_IMAGE_DELETE_SUCCESS
    );
  } catch (error) {
    errorResponseData(
      res,
      RESPONSE_CODE.BAD_REQUEST,
      errorMessages.INTERNAL_SERVER_ERROR
    );
  }
};

const updateProductMedia = async (req, res) => {
  try {
    const { id, file } = req.body;
    const model = Models.product_media;
    const mediaExists = await model.findOne({ where: { id } });
    if (!mediaExists) {
      return errorResponseWithoutData(
        res,
        RESPONSE_CODE.NOT_FOUND,
        errorMessages.PRODUCT__MEDIA_NOT_FOUND
      );
    }
    await model.update({ file }, { where: { id } });
    return successResponseWithoutData(
      res,
      RESPONSE_CODE.SUCCESS,
      successMessages.PRODUCT_IMAGE_UPDATE_SUCCESS
    );
  } catch (error) {
    errorResponseData(
      res,
      RESPONSE_CODE.BAD_REQUEST,
      errorMessages.INTERNAL_SERVER_ERROR
    );
  }
};

const getProductMedia = async (req, res) => {
  try {
    const id = req.body.id;
    const model = Models.product_media;
    const mediaExists = await model.findAndCountAll({ where: { id } },of)
    if (!mediaExists) {
      return errorResponseWithoutData(
        res,
        RESPONSE_CODE.NOT_FOUND,
        errorMessages.PRODUCT__MEDIA_NOT_FOUND
      );
    }
    return successResponseWithoutData(
      res,
      RESPONSE_CODE.SUCCESS,
      successMessages.PRODUCT_IMAGE_UPDATE_SUCCESS
    );
  } catch (error) {
    errorResponseData(
      res,
      RESPONSE_CODE.BAD_REQUEST,
      errorMessages.INTERNAL_SERVER_ERROR
    );
  }
};

export {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  uploadMediaProduct,
  updateProductMedia,
  deleteProductMedia,
};
