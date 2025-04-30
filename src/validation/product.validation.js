import { errorResponseData, successResponseData } from "../utility/response.js";
import { RESPONSE_CODE } from "../utility/constant.js";
import Joi from "joi";

const productValidation = (req, res, callback) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
    price: Joi.number().required(),
    category_id: Joi.required(),
  });

  const { error } = schema.validate(req.body);
  if (error) errorResponseData(res, RESPONSE_CODE.FORBIDDEN, error.message);
  return callback(true);
};

const updateProductValidation = (req, res, callback) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().min(3),
    description: Joi.string().min(3),
    price: Joi.number(),
    category_id: Joi.number(),
  });

  const { error } = schema.validate(req.body);
  if (error) errorResponseData(res, RESPONSE_CODE.FORBIDDEN, error.message);
  return callback(true);
};
export { productValidation, updateProductValidation};
