import Joi from "joi";

const signupFormSchema = Joi.object({
  username: Joi.string().alphanum().min(4).max(30).required(),
  password: Joi.string().min(8).max(30).required(),
  confirmPassword: Joi.ref("password"),
  firstName: Joi.string().alphanum().min(3).max(30).required(),
  lastName: Joi.string().alphanum().min(3).max(30).required(),
});
