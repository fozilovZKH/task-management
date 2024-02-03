import { ResData } from "../../common/resData.js";
import { UserEntity } from "./entity/user.entity.js";
import {
  UserBadRequestException,
  UserPasswordWrongException,
  UserNotCreatedException,
  UserNotFoundException,
} from "./exception/user.exception.js";
import { UserRepository } from "./user.repository.js";
import { hashed, compare } from "../../lib/bcript.js";
import { generateToken } from "../../lib/jwt.js";

export class UserService {
  #repository;
  constructor() {
    this.#repository = new UserRepository();
  }

  // Get All
  async getAll() {
    const foundAll = await this.#repository.findAll();
    const resData = new ResData("success login", 200, foundAll);
    return resData;
  }

  // Create
  async create(dto) {
    const hashedPassword = await hashed(dto.password);
    dto.password = hashedPassword;

    const newUser = new UserEntity(dto);
    const createdUser = await this.#repository.insert(newUser);
    if (!createdUser) {
      throw new UserNotCreatedException();
    }

    const token = generateToken(createdUser.id);
    const resData = new ResData("success created", 201, {
      user: createdUser,
      token,
    });

    return resData;
  }

  // User Login
  async login(dto) {
    const foundUserByLogin = await this.findByLogin(dto.login);
    if (!foundUserByLogin.data) {
      throw new UserBadRequestException();
    }
    const isValidPassword = await compare(
      dto.password,
      foundUserByLogin.data.password
    );
    if (!isValidPassword) {
      throw new UserPasswordWrongException();
    }

    const newToken = generateToken(foundUserByLogin.data.id);
    const resData = new ResData("login success", 200, {
      token: newToken,
      user: foundUserByLogin.data,
    });

    return resData;
  }

  // Find by Login
  async findByLogin(login) {
    const foundByLogin = await this.#repository.findOneByLogin(login);
    let resData;
    if (foundByLogin) {
      resData = new ResData("success login", 200, foundByLogin);
    } else {
      resData = new ResData("user not found", 404, foundByLogin);
    }

    return resData;
  }

  // Find by Id
  async findById(id) {
    const foundById = await this.#repository.findOneById(id);
    if (!foundById) {
      throw new UserNotFoundException();
    }

    const resData = new ResData("success", 200, foundById);
    return resData;
  }

  // Delete By Id
  async delete(id) {
    await this.findById(id);
    const deletedUser = await this.#repository.delete(id);
    const resData = new ResData("Deleted successfully!", 200, {
      user: deletedUser,
    });

    return resData;
  }

  // Update By Id
  async update(id, dto) {
    await this.findById(id);
    const updateUser = new UserEntity(dto);
    updateUser.id = id;

    const updatedUser = await this.#repository.update(updateUser);
    const resData = new ResData("Updated successfully!", 200, {
      user: updatedUser,
    });

    return resData;
  }
}
