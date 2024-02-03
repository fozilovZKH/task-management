import { ResData } from "../../common/resData.js";
import { validationSchema } from "../../lib/validationSchema.js";
import {
  CompanyNameAlreadyExistException,
  CompanyBadRequestException,
} from "./exception/company.exception.js";
import { companySchema, getByIdSchema } from "./validation/company.schema.js";

export class CompanyController {
  #companyService;
  constructor(companyService) {
    this.#companyService = companyService;
  }

  // GET ALL
  async getAll(req, res) {
    try {
      const resData = await this.#companyService.getAll();
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

  async create(req, res) {
    try {
      const dto = req.body;

      validationSchema(companySchema, dto);

      const resDataGetByName = await this.#companyService.findByName(dto.name);

      if (resDataGetByName.data) {
        throw new CompanyNameAlreadyExistException();
      }

      const resData = await this.#companyService.create(dto);

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
        throw new CompanyBadRequestException(validated.error.message);
      }
      const resData = await this.#companyService.getById(dto);
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
      validationSchema(companySchema, dto);
      const resDataGetByName = await this.#companyService.findByName(dto.name);
      if (resDataGetByName.data) {
        throw new CompanyNameAlreadyExistException();
      }
      const resData = await this.#companyService.update(id, dto);
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
        throw new CompanyBadRequestException(validated.error.message);
      }
      const resData = await this.#companyService.delete(id);
      return res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, 400, null, error);
      return res.status(resData.statusCode).json(resData);
    }
  }
}
