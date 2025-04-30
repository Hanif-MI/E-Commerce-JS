import Joi from "joi";

const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const signUpSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).max(12).required(),
  password: Joi.string()
    //   .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
});

const otpVerificationSchema = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.required()
});

export { signInSchema, signUpSchema, otpVerificationSchema };
