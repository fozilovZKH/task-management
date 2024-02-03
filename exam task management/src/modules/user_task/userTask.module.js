import { Router } from "express";
import { UserTaskControlle } from "./userTask.controller.js";
import { UserTaskService } from "./userTask.service.js";
import { UserService } from "../user/user.service.js";
import { TaskService } from "../task/task.service.js";
import { AuthorizationMiddleware } from "../../middleware/authorization.js";

const router = Router();

const userTaskService = new UserTaskService();
const userService = new UserService();
const taskService = new TaskService();
const userTaskController = new UserTaskControlle(
  userTaskService,
  userService,
  taskService
);

const authorizationMiddleware = new AuthorizationMiddleware();

router.get("/:id", (req, res) => {
  userTaskController.getById(req, res);
});

router.get("/user/:id", (req, res) => {
  userTaskController.getByUserId(req, res);
});

router.get("/task/:id", (req, res) => {
  userTaskController.getByTaskId(req, res);
});

router.post(
  "/",
  authorizationMiddleware.checkToken,
  authorizationMiddleware.checkUser,
  authorizationMiddleware.checkAdminRole,
  (req, res) => {
    userTaskController.create(req, res);
  }
);

router.put(
  "/:id",
  authorizationMiddleware.checkToken,
  authorizationMiddleware.checkUser,
  authorizationMiddleware.checkAdminRole,
  (req, res) => {
    userTaskController.updateById(req, res);
  }
);

router.delete(
  "/:id",
  authorizationMiddleware.checkToken,
  authorizationMiddleware.checkUser,
  authorizationMiddleware.checkAdminRole,
  (req, res) => {
    userTaskController.deleteById(req, res);
  }
);

export default { router };
