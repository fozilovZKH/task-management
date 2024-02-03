import { ResData } from "../../common/resData.js";
import { validationSchema } from "../../lib/validationSchema.js";
import {
  UserTaskException,
  UserTaskNotFoundException,
} from "./exception/userTask.exception.js";
import { userTaskSchema, getByIdSchema } from "./validation/userTask.schema.js";

export class UserTaskControlle {
  #userTaskService;
  #userService;
  #taskService;
  constructor(userTaskService, userService, taskService) {
    this.#userTaskService = userTaskService;
    this.#userService = userService;
    this.#taskService = taskService;
  }

  // Get By Id
  async getById(req, res) {
    try {
      const id = req.params.id;
      const validated = getByIdSchema.validate(req.params);
      if (validated.error) {
        throw new UserTaskException(validated.error.message);
      }
      const resData = await this.#userTaskService.findById(id);
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
      validationSchema(userTaskSchema, dto);

      await this.#userService.findById(dto.userId);
      await this.#taskService.getById(dto.taskId);
      const resData = await this.#userTaskService.create(dto);
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

  // Get By UserId
  async getByUserId(req, res) {
    try {
      const dto = req.params.id;
      const validated = getByIdSchema.validate(req.params);
      if (validated.error) {
        throw new UserTaskException(validated.error.message);
      }

      const resData = await this.#userTaskService.findByUserId(dto);
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

  // Get By TaskId
  async getByTaskId(req, res) {
    try {
      const dto = req.params.id;
      const validated = getByIdSchema.validate(req.params);
      if (validated.error) {
        throw new UserTaskException(validated.error.message);
      }

      const resData = await this.#userTaskService.findByTaskId(dto);
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
      validationSchema(userTaskSchema, dto);

      await this.#userService.findById(dto.userId);
      await this.#taskService.getById(dto.taskId);

      const resData = await this.#userTaskService.update(id, dto);
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
        throw new UserTaskException(validated.error.message);
      }
      const resData = await this.#userTaskService.delete(id);
      return res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, 400, null, error);
      return res.status(resData.statusCode).json(resData);
    }
  }
}
