import Joi from "joi";

const createProductSchema = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().min(3).required(),
  price: Joi.number().required(),
  category_id: Joi.required(),
});

const updateProductSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().min(3),
  description: Joi.string().min(3),
  price: Joi.number(),
  category_id: Joi.number(),
});

const productIdSchema = Joi.object({
  productId: Joi.number().required(),
});

const getProductSchema = Joi.object({
  offset : Joi.number().default(1),
  limit : Joi.number().default(1),
})

export { createProductSchema, updateProductSchema,productIdSchema,getProductSchema };
