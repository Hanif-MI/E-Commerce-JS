import Joi, { required } from "joi";

const addOrderHistoryValidation = (req, res, callback) => {
  const schema = Joi.object({
    cart_id: Joi.required(),
  });
  const { error } = schema.validate(req.body);
  if (error) errorResponseData(res, RESPONSE_CODE.FORBIDDEN, error.message);
  return callback(true);
};

export { addOrderHistoryValidation };
