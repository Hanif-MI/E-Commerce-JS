import Joi from "joi";

const addOrderHistorySchema = Joi.object({
  id: Joi.required(),
  status : Joi.required()
});
export { addOrderHistorySchema };
