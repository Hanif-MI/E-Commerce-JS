import Joi from "joi";
import {
  errorResponseData,
  errorResponseWithData,
  errorResponseWithoutData,
} from "../utility/response.js";
import { RESPONSE_CODE } from "../utility/constant.js";

export const signUpValidation = (req, res, callback) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(10).max(12).required(),
    password: Joi.string()
      //   .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  });

  const { error } = schema.validate(req.body);
  if (error) errorResponseData(res, RESPONSE_CODE.FORBIDDEN, error.message);
  return callback(true);
};

export const signInValidation = (req, res, callback) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) errorResponseData(res, RESPONSE_CODE.FORBIDDEN, error.message);
  return callback(true);
};

export const emailValidation = (req, res, callback) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });
  const { error } = schema.validate(req.body);
  if (error)
    return errorResponseWithoutData(res, RESPONSE_CODE.FORBIDDEN, error.message);
  callback(true);
};
