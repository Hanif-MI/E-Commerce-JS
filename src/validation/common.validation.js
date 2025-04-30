import Joi from "joi";

const idSchema = Joi.object({
  id: Joi.required(),
});

const emailSchema = Joi.object({
  email: Joi.string().email().required(),
});

const nameSchema = Joi.object({
  name: Joi.string().required(),
});

export { idSchema, emailSchema, nameSchema };
