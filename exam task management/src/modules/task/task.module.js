import { Router } from "express";
import { TaskController } from "./task.controller.js";
import { TaskService } from "./task.service.js";
import { CompanyService } from "../company/company.service.js";
import { AuthorizationMiddleware } from "../../middleware/authorization.js";

const router = Router();

const authorizationMiddleware = new AuthorizationMiddleware();

const taskService = new TaskService();
const companyService = new CompanyService();
const taskController = new TaskController(taskService, companyService);

router.get("/", (req, res) => {
  taskController.getAll(req, res);
});

router.post(
  "/",
  authorizationMiddleware.checkToken,
  authorizationMiddleware.checkUser,
  authorizationMiddleware.checkAdminRole,
  (req, res) => {
    taskController.create(req, res);
  }
);

router.get("/:id", (req, res) => {
  taskController.getById(req, res);
});

router.get("/company/:id", (req, res) => {
  taskController.getByCompanyId(req, res);
});

router.put(
  "/:id",
  authorizationMiddleware.checkToken,
  authorizationMiddleware.checkUser,
  authorizationMiddleware.checkAdminRole,
  (req, res) => {
    taskController.updateById(req, res);
  }
);

router.delete(
  "/:id",
  authorizationMiddleware.checkToken,
  authorizationMiddleware.checkUser,
  authorizationMiddleware.checkAdminRole,
  (req, res) => {
    taskController.deleteById(req, res);
  }
);

export default { router };
