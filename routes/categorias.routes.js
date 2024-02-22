import express from "express"
import {GetCategories, createCategories,GetCategoriesxId,UpdateCategories, DeleteCategories} from "../controllers/categorias.controller.js"
import { verifyToken  } from "../Resources/verifyToken.js";

const routesCategorias = express();

routesCategorias.get("/api/categories", GetCategories);

routesCategorias.get("/api/categories/:id", GetCategoriesxId);

routesCategorias.post("/api/categories/create",verifyToken, createCategories);

routesCategorias.put("/api/categories/update/:id", verifyToken, UpdateCategories);

routesCategorias.delete("/api/categories/delete/:id", verifyToken, DeleteCategories)

export default routesCategorias;