import Joi from "joi";
import { roles } from "../../../common/enums/roles.js";

const rolesArray = Object.values(roles);

export const registerSchema = Joi.object({
  login: Joi.string().max(100).min(4).required(),
  password: Joi.string().max(32).min(4).required(),
  fullName: Joi.string().max(32).min(4).required(),
  companyId: Joi.number().integer().min(1).required(),
  role: Joi.string().valid(...rolesArray).required(),
  repeatPassword: Joi.ref("password"),
});

export const loginSchema = Joi.object({
  login: Joi.string().required().min(3).max(100),
  password: Joi.string().required(),
});

export const getByIdSchema = Joi.object({
  id: Joi.number().required(),
});

export const updateSchema = Joi.object({
    login: Joi.string().max(100).min(4).required(),
    password: Joi.string().max(32).min(4).required(),
    fullName: Joi.string().max(32).min(4).required(),
    companyId: Joi.number().integer().min(1).required(),
    role: Joi.string().valid(...rolesArray).required(),
    repeatPassword: Joi.ref("password"),
  });