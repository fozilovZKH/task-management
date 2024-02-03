import { ResData } from "../../common/resData.js";
import { CompanyEntity } from "./entity/company.entity.js";
import {
  CompanyBadRequestException,
  CompanyNameAlreadyExistException,
  CompanyNotCreatedException,
  CompanyNotFoundException
} from "./exception/company.exception.js";
import { CompanyRepository } from "./company.repository.js";

export class CompanyService {
  #repository;
  constructor() {
    this.#repository = new CompanyRepository();
  }

  // Get all
  async getAll() {
    const foundAll = await this.#repository.findAll();
    const resData = new ResData("success get all", 200, foundAll);
    return resData;
  }

  // Create
  async create(dto) {
    const newCompany = new CompanyEntity(dto);
    console.log(newCompany);
    await this.#repository.insert(newCompany);
    return new ResData("Company created successfully", 201, {
      company: newCompany,
    });
  }

  // Find by name
  async findByName(name) {
    const foundByName = await this.#repository.findOneByName(name);
    let resData;
    if (foundByName) {
      resData = new ResData("success name", 200, foundByName);
    } else {
      resData = new ResData("name is already", 404, foundByName);
    }

    return resData;
  }

  // Get By ID
  async getById(id) {
    const foundCompanyById = await this.#repository.findOneById(id);
    if (!foundCompanyById) {
      throw new CompanyNotFoundException();
    }
    return new ResData("Found Company", 200, foundCompanyById);
  }

  // Update By Id
  async update(id, dto) {
    await this.getById(id);
    const updateCompany = new CompanyEntity(dto);
    updateCompany.id = id;

    const updatedCompany = await this.#repository.update(updateCompany);

    const resData = new ResData("Updated successfully!", 200, {
      company: updatedCompany,
    });

    return resData;
  }

  // Delete By Id
  async delete(id) {
    await this.getById(id);
    const deletedCompany = await this.#repository.delete(id);
    return new ResData("Deleted successfully!", 200, {
      company: deletedCompany,
    });
  }
}
