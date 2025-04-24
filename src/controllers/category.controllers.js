import { createCategoryValidation } from "../validatons/category.validation.js";
import Models from "../models/index.js";
import { errorResponseData, successResponseData } from "../utility/response.js";
import { RESPONSE_CODE } from "../utility/constant.js";

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
    createCategoryValidation(req, res, async (isValidate) => {
      if (!isValidate)
        errorResponseData(res, RESPONSE_CODE.BAD_REQUEST, "Validation failed");

      const { name } = req.body;
      console.log(name, "!@#");
      const isCategoryExists = await model.findOne({ where: { name } });
      if (isCategoryExists) {
        return errorResponseData(
          res,
          RESPONSE_CODE.BAD_REQUEST,
          "Category already exists"
        );
      }

      const newCategory = await model.create({
        name,
      });

      successResponseData(
        res,
        newCategory,
        RESPONSE_CODE.SUCCESS,
        "User created successfully"
      );
    });
  } catch (error) {
    errorResponseData(
      res,
      RESPONSE_CODE.INTERNAL_SERVER,
      "Error while creating category"
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
    successResponseData(
      res,
      categories,
      RESPONSE_CODE.SUCCESS,
      "User created successfully"
    );
  } catch (error) {
    errorResponseData(
      res,
      RESPONSE_CODE.INTERNAL_SERVER,
      "Error while getting all the categories"
    );
  }
};

export { createCategory, getAllCategories };
