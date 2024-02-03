import { ResData } from "../../common/resData.js";
import {
  UserTaskException,
  UserTaskNotFoundException,
} from "./exception/userTask.exception.js";
import { UserTaskEntity } from "./entity/userTask.entity.js";
import { UserTaskRepository } from "./userTask.repository.js";

export class UserTaskService {
  #repository;
  constructor() {
    this.#repository = new UserTaskRepository();
  }

  // Find by Id
  async findById(id) {
    const foundById = await this.#repository.findOneById(id);
    if (!foundById) {
      throw new UserTaskNotFoundException();
    }

    const resData = new ResData("success", 200, foundById);
    return resData;
  }

  // Find by UserId
  async findByUserId(id) {
    const foundById = await this.#repository.getByUserId(id);
    if (!foundById) {
      throw new UserTaskNotFoundException();
    }

    const resData = new ResData("success", 200, foundById);
    return resData;
  }

  // Find by TaskId
  async findByTaskId(id) {
    const foundById = await this.#repository.getByTaskId(id);
    if (!foundById) {
      throw new UserTaskNotFoundException();
    }

    const resData = new ResData("success", 200, foundById);
    return resData;
  }

  // Create
  async create(dto) {
    const newUserTask = new UserTaskEntity(dto);
    await this.#repository.insert(newUserTask);
    const resData = new ResData("success created", 201, {
      userTask: newUserTask,
    });

    return resData;
  }

    // Update By Id
    async update(id, dto) {
        await this.findById(id);
        const updateUserTask = new UserTaskEntity(dto);
        updateUserTask.id = id;
    
        const updatedTask = await this.#repository.update(updateUserTask);
    
        const resData = new ResData("Updated successfully!", 200, {
          task: updatedTask,
        });
    
        return resData;
      }
    
      // Delete By Id
      async delete(id) {
        await this.findById(id);
        const deletedTask = await this.#repository.delete(id);
        return new ResData("Deleted successfully!", 200, {
          task: deletedTask,
        });
      }
}
