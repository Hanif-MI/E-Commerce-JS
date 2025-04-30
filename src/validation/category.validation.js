import Joi from "joi";
import { errorResponseData } from "../utility/response.js";
import { RESPONSE_CODE } from "../utility/constant.js";


const createCategoryValidation = (req, res, callback) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) errorResponseData(res, RESPONSE_CODE.FORBIDDEN, error.message);
  return callback(true);
};

export { createCategoryValidation };  
