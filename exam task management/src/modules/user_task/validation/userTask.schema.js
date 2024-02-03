import Joi from "joi";

export const userTaskSchema = Joi.object({
  userId: Joi.number().integer().min(1).required(),
  taskId: Joi.number().integer().min(1).required(),
  startAt: Joi.date(),
  endAt: Joi.date().required(),
  startedDate: Joi.date(),
  endedDate: Joi.date(),
  status: Joi.string().max(32).min(4).required(),
});

export const getByIdSchema = Joi.object({
  id: Joi.number().required(),
});