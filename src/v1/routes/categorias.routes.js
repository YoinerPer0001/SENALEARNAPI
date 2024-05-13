import express from "express";
import {
  GetCategories,
  createCategories,
  GetCategoriesxId,
  UpdateCategories,
  deleteCat
} from "../../controllers/categorias.controller.js";
import { verifyToken } from "../../middlewares/verifyToken.js";
import { adminPermiso, AdminInstPermissions } from "../../middlewares/managePermissions.js";
import { createValidation, UpdateValidation } from "../../Validators/categorias.validator.js";

const routesCategorias = express();


routesCategorias.get("/api/v1/categories", GetCategories);

routesCategorias.get("/api/v1/categories/:id", GetCategoriesxId);


routesCategorias.post("/api/v1/categories/create", createValidation,  verifyToken,adminPermiso,createCategories);


routesCategorias.put("/api/v1/categories/update/:id", UpdateValidation,verifyToken,adminPermiso,UpdateCategories);


routesCategorias.delete("/api/categories/delete/:id",verifyToken,adminPermiso,deleteCat);

export default routesCategorias;
