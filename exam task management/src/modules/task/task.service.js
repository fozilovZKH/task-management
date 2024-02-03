import { ResData } from "../../common/resData.js";
import { TaskEntity } from "./entity/task.entity.js";
import { TaskNotFoundException } from "./exception/task.exception.js";
import { TaskRepository } from "./task.repository.js";

export class TaskService {
  #repository;
  constructor() {
    this.#repository = new TaskRepository();
  }

  // Get all
  async getAll() {
    const foundAll = await this.#repository.findAll();
    const resData = new ResData("success get all", 200, foundAll);
    return resData;
  }

  // Create
  async create(dto) {
    const newTask = new TaskEntity(dto);
    console.log(newTask);
    await this.#repository.insert(newTask);
    return new ResData("task created successfully", 201, {
      task: newTask,
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
    const foundTaskById = await this.#repository.findOneById(id);
    if (!foundTaskById) {
      throw new TaskNotFoundException();
    }
    return new ResData("Found task", 200, foundTaskById);
  }

  // Get By Company Id
  async getByCompanyId(id) {
    const foundTaskById = await this.#repository.getTasksByCompanyId(id);
    if (!foundTaskById) {
      throw new TaskNotFoundException();
    }
    return new ResData("Found task", 200, foundTaskById);
  }

  // Update By Id
  async update(id, dto) {
    await this.getById(id);
    const updateTask = new TaskEntity(dto);
    updateTask.id = id;

    const updatedTask = await this.#repository.update(updateTask);

    const resData = new ResData("Updated successfully!", 200, {
      task: updatedTask,
    });

    return resData;
  }

  // Delete By Id
  async delete(id) {
    await this.getById(id);
    const deletedTask = await this.#repository.delete(id);
    return new ResData("Deleted successfully!", 200, {
      task: deletedTask,
    });
  }
}
