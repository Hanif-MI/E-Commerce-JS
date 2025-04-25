import Joi from "joi";
import { errorResponseData, successResponseData } from "../utility/response.js";
import { RESPONSE_CODE } from "../utility/constant.js";

const addressValidation = (req, res, callback) => {
  const schema = Joi.object({
    full_address: Joi.string().min(10).max(200).required(),
    user_id: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) errorResponseData(res, RESPONSE_CODE.FORBIDDEN, error.message);
  return callback(true);
};

const updateAddressValidation = (req, res, callback) => {
  const schema = Joi.object({
    id: Joi.required(),
    full_address: Joi.string().min(10).max(200).required(),
    user_id: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) errorResponseData(res, RESPONSE_CODE.FORBIDDEN, error.message);
  return callback(true);
};

const makeAddressDefaultValidation = (req, res, callback) => {
  const schema = Joi.object({
    id: Joi.required(),
    user_id: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) errorResponseData(res, RESPONSE_CODE.FORBIDDEN, error.message);
  return callback(true);
};

export { addressValidation, updateAddressValidation, makeAddressDefaultValidation };
