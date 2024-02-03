import { ResData } from "../../common/resData.js";
import { validationSchema } from "../../lib/validationSchema.js";
import {
  TaskBadRequestException,
  TaskNotFoundException,
} from "./exception/task.exception.js";
import {
  taskSchema,
  getByIdSchema,
  getByCompanyIdSchema,
} from "./validation/task.schema.js";

export class TaskController {
  #taskService;
  #companyService;
  constructor(taskService, companyService) {
    this.#taskService = taskService;
    this.#companyService = companyService;
  }

  // GET ALL
  async getAll(req, res) {
    try {
      const resData = await this.#taskService.getAll();
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

  // create
  async create(req, res) {
    try {
      const dto = req.body;
      validationSchema(taskSchema, dto);

      await this.#companyService.getById(dto.companyId);
      const resData = await this.#taskService.create(dto);
      return res.status(resData.statusCode).json(resData);
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
      const dto = req.params.id;
      const validated = getByIdSchema.validate(req.params);
      if (validated.error) {
        throw new TaskBadRequestException(validated.error.message);
      }

      const resData = await this.#taskService.getById(dto);
      return res.status(resData.statusCode).json(resData);
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

  // Get By CompanyId
  async getByCompanyId(req, res) {
    try {
      const dto = req.params.id;
      const validated = getByIdSchema.validate(req.params);
      if (validated.error) {
        throw new TaskBadRequestException(validated.error.message);
      }
      
      const resData = await this.#taskService.getByCompanyId(dto);
      return res.status(resData.statusCode).json(resData);
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

  // Update By Id
  async updateById(req, res) {
    try {
      const id = req.params.id;
      const dto = req.body;
      validationSchema(taskSchema, dto);
      await this.#companyService.getById(dto.companyId);

      const resData = await this.#taskService.update(id, dto);
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

  // Delete By Id
  async deleteById(req, res) {
    try {
      const id = req.params.id;
      const validated = getByIdSchema.validate(req.params);
      if (validated.error) {
        throw new TaskBadRequestException(validated.error.message);
      }
      const resData = await this.#taskService.delete(id);
      return res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, 400, null, error);
      return res.status(resData.statusCode).json(resData);
    }
  }
}
