import express from "express"
import {GetCategories, createCategories,UpdateCategories} from "../controllers/categorias.controller.js"
import { verifyToken  } from "../Resources/verifyToken.js";

const routesCategorias = express();

routesCategorias.get("/api/categorias", GetCategories);

routesCategorias.post("/api/categorias/create",verifyToken, createCategories);

routesCategorias.put("/api/categorias/update/:id", verifyToken, UpdateCategories);

export default routesCategorias;