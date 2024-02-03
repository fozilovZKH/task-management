import { Router } from "express";
import { UserController } from "./user.controller.js";
import { UserService } from "./user.service.js";
import { CompanyService } from "../company/company.service.js";
import { AuthorizationMiddleware } from "../../middleware/authorization.js";

const router = Router();

const userService = new UserService();
const companyService = new CompanyService();
const userController = new UserController(userService, companyService);

const authorizationMiddleware = new AuthorizationMiddleware();

router.post("/register",
authorizationMiddleware.checkToken,
  authorizationMiddleware.checkUser,
  authorizationMiddleware.checkAdminRole,
(req, res) => {
  userController.register(req, res);
});

router.get(
  "/",
  authorizationMiddleware.checkToken,
  authorizationMiddleware.checkUser,
  authorizationMiddleware.checkAdminRole,
  (req, res) => {
    userController.getAll(req, res);
  }
);

router.get(
  "/:id",
  (req, res) => {
    userController.getById(req, res);
  }
);

router.post(
  "/login",
    authorizationMiddleware.checkToken,
    authorizationMiddleware.checkUser,
    authorizationMiddleware.checkAdminRole,
  (req, res) => {
    userController.login(req, res);
  }
);

router.put(
  "/:id",
  authorizationMiddleware.checkToken,
  authorizationMiddleware.checkUser,
  authorizationMiddleware.checkAdminRole,
  (req, res) => {
    userController.updateById(req, res);
  }
);

router.delete(
  "/:id",
  authorizationMiddleware.checkToken,
  authorizationMiddleware.checkUser,
  authorizationMiddleware.checkAdminRole,
  (req, res) => {
    userController.deleteById(req, res);
  }
);

export default { router };
