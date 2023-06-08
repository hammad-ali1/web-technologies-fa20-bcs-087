import Joi from "joi";

export const voltageReadingSchema = Joi.object({
  max: Joi.number().required(),
  min: Joi.number().required(),
  avg: Joi.number().required(),
});
