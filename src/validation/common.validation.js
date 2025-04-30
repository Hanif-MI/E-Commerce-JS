import Joi from "joi";
import { errorResponseData } from "../utility/response.js";
import { RESPONSE_CODE } from "../utility/constant.js";

const idValidation = (req, res, callback) => {
  const schema = Joi.object({
    id: Joi.required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return errorResponseData(res, RESPONSE_CODE.FORBIDDEN, error.message);
  return callback(true);
};

export { idValidation };
