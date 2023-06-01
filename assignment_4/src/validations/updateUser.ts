import Joi from "joi";

export const updateUserSchema = Joi.object({
  username: Joi.string().alphanum().max(30).required(),
  prevPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
  firstName: Joi.string().alphanum().min(3).max(30).required(),
  lastName: Joi.string().alphanum().min(3).max(30).required(),
});
