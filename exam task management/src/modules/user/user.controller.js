import { ResData } from "../../common/resData.js";
import { validationSchema } from "../../lib/validationSchema.js";
import {
  UserLoginAlreadyExistException,
  UserBadRequestException,
} from "./exception/user.exception.js";
import {
  registerSchema,
  loginSchema,
  getByIdSchema,
  updateSchema,
} from "./validation/user.schema.js";

export class UserController {
  #userService;
  #companyService;
  constructor(userService, companyService) {
    this.#userService = userService;
    this.#companyService = companyService;
  }

  // Get All Users
  async getAll(req, res) {
    try {
      const resData = await this.#userService.getAll();

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(
        error.message,
        error.statusCode || 500,
        null,
        error
      );

      res.status(resData.statusCode).json(resData);
    }
  }

  // Get By Id
  async getById(req, res) {
    try {
      const id = req.params.id;
      const validated = getByIdSchema.validate(req.params);
      if (validated.error) {
        throw new UserBadRequestException(validated.error.message);
      }
      const resData = await this.#userService.findById(id);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(
        error.message,
        error.statusCode || 500,
        null,
        error
      );

      res.status(resData.statusCode).json(resData);
    }
  }

  // Register
  async register(req, res) {
    try {
      const dto = req.body;

      validationSchema(registerSchema, dto);

      const resDataGetByLogin = await this.#userService.findByLogin(dto.login);

      if (resDataGetByLogin.data) {
        throw new UserLoginAlreadyExistException();
      }

      await this.#companyService.getById(dto.companyId);

      const resData = await this.#userService.create(dto);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(
        error.message,
        error.statusCode || 500,
        null,
        error
      );

      res.status(resData.statusCode).json(resData);
    }
  }

  // User Login
  async login(req, res) {
    try {
      const dto = req.body;
      validationSchema(loginSchema, dto);

      const resData = await this.#userService.login(dto);
      req.header("token", resData.data.token);
      return res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);
      return res.status(error.statusCode).json(resData);
    }
  }

  // Delete By Id
  async deleteById(req, res) {
    try {
      const id = req.params.id;
      const validated = getByIdSchema.validate(req.params);
      if (validated.error) {
        throw new UserBadRequestException(validated.error.message);
      }
      const resData = await this.#userService.delete(id);
      return res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, 400, null, error);
      return res.status(resData.statusCode).json(resData);
    }
  }

  // Update By Id
  async updateById(req, res) {
    try {
      const id = req.params?.id;
      const dto = req.body;
      validationSchema(updateSchema, dto);

      await this.#companyService.getById(dto.companyId);

      console.log("dto: ", dto);
      const resData = await this.#userService.update(id, dto);
      return res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(
        error.message,
        error.statusCode || 500,
        null,
        error
      );
      return res.status(resData.statusCode).json(resData);
    }
  }
}
