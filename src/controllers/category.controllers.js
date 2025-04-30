import Models from "../models/index.js";
import {
  errorResponseData,
  successResponseData,
  successResponseWithoutData,
} from "../utility/response.js";
import { RESPONSE_CODE } from "../utility/constant.js";
import { errorMessages, successMessages } from "../utility/messages.js";

const createCategory = async (req, res) => {
  /**
   * Steps to create the category
   * 1. validate the request body.
   * 2. check if already exists same category.
   * 3. insert in to the database
   * 4. Send a response
   * 5. Handle errors
   * 6. Test the endpoint
   */
  try {
    const model = Models.Category;
    const { name } = req.body;
    const isCategoryExists = await model.findOne({ where: { name } });
    if (isCategoryExists) {
      return errorResponseData(
        res,
        RESPONSE_CODE.BAD_REQUEST,
        errorMessages.CATEGORY_ALREADY_EXISTS
      );
    }

    const newCategory = await model.create({ name });

    successResponseData(
      res,
      newCategory,
      RESPONSE_CODE.SUCCESS,
      successMessages.CATEGORY_CREATE_SUCCESS
    );
  } catch (error) {
    errorResponseData(
      res,
      RESPONSE_CODE.INTERNAL_SERVER,
      errorMessages.INTERNAL_SERVER_ERROR
    );
  }
};

const getAllCategories = async (req, res) => {
  /**
   * Steps to get all categories.
   * -> get all category from the db
   * -> Send a response
   * -> Handle errors
   * -> Test the endpoint
   */

  try {
    const model = Models.Category;
    const categories = await model.findAll();
    successResponseData(res, categories, RESPONSE_CODE.SUCCESS, "");
  } catch (error) {
    errorResponseData(
      res,
      RESPONSE_CODE.INTERNAL_SERVER,
      errorMessages.INTERNAL_SERVER_ERROR
    );
  }
};

const deleteCategory = async (req, res) => {
  /**
   * Steps to create the category
   * 1. validate the request body.
   * 2. check if category exists.
   * 3. delete from the database
   * 4. Send a response
   * 5. Handle errors
   * 6. Test the endpoint
   */

  try {
    const { id } = req.body;

    const model = Models.Category;
    const category = await model.findOne({ where: { id } });
    if (!category) {
      return errorResponseData(
        res,
        RESPONSE_CODE.BAD_REQUEST,
        errorMessages.CATEGORY_NOT_FOUND
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

export { createCategory, getAllCategories, deleteCategory };
