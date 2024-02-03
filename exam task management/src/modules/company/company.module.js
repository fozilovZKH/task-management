import { Router } from "express";
import { CompanyController } from "./company.controller.js";
import { CompanyService } from "./company.service.js";
import { AuthorizationMiddleware } from "../../middleware/authorization.js";

const router = Router();

const authorizationMiddleware = new AuthorizationMiddleware();

const companyService = new CompanyService();
const companyController = new CompanyController(companyService);

router.get(
  "/",
  authorizationMiddleware.checkToken,
  authorizationMiddleware.checkUser,
  authorizationMiddleware.checkSuperAdminRole,
  (req, res) => {
    companyController.getAll(req, res);
  }
);

router.post(
  "/",
  authorizationMiddleware.checkToken,
  authorizationMiddleware.checkUser,
  authorizationMiddleware.checkSuperAdminRole,
  (req, res) => {
    companyController.create(req, res);
  }
);

router.get("/:id", (req, res) => {
  companyController.getById(req, res);
});

router.put(
  "/:id",
  authorizationMiddleware.checkToken,
  authorizationMiddleware.checkUser,
  authorizationMiddleware.checkSuperAdminRole,
  (req, res) => {
    companyController.updateById(req, res);
  }
);

router.delete(
  "/:id",
  authorizationMiddleware.checkToken,
  authorizationMiddleware.checkUser,
  authorizationMiddleware.checkSuperAdminRole,
  (req, res) => {
    companyController.deleteById(req, res);
  }
);

export default { router };
