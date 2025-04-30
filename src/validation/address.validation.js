import Joi from "joi";

const createAddressSchema = Joi.object({
  full_address: Joi.string().min(10).max(200).required(),
});

const updateAddressSchema = Joi.object({
  id: Joi.required(),
  full_address: Joi.string().min(10).max(200).required(),
});

export { createAddressSchema, updateAddressSchema };
