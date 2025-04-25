import Joi from "joi";
import { errorResponseData } from "../utility/response.js";
import { RESPONSE_CODE } from "../utility/constant.js";

const updateCartValidation = (req, res, callback) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    status: Joi.string().valid(
      "pending",
      "completed",
      "cancelled",
      "inprogress"
    ).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) errorResponseData(res, RESPONSE_CODE.FORBIDDEN, error.message);
  return callback(true);
};

export { updateCartValidation };
