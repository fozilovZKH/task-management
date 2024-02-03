import Joi from "joi";

export const companySchema = Joi.object({
  name: Joi.string().min(3).max(128).required()
});

export const getByIdSchema = Joi.object({
  id: Joi.number().required(),
});
