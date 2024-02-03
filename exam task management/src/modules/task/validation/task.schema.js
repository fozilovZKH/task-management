import Joi from "joi";

export const taskSchema = Joi.object({
  title: Joi.string().min(3).max(128).required(),
  description: Joi.string().min(3).max(256).required(),
  companyId: Joi.number().integer().min(1).required(),
  parentId: Joi.number().integer().min(1).default(null),
  day: Joi.number().integer().min(1).required(),
});

export const getByIdSchema = Joi.object({
  id: Joi.number().required(),
});

export const getByCompanyIdSchema = Joi.object({
  companyId: Joi.number().integer().required(),
});
