import express from "express";
import { getCursos, getCuCat,CreateCourse, UpdateCourse} from "../controllers/cursos.controller.js";
import { verifyToken } from "../Resources/verifyToken.js";

const RoutesCursos = express();

RoutesCursos.get("/api/cursos", getCursos);

RoutesCursos.get("/api/cursos/:id",getCuCat);

RoutesCursos.post("/api/cursos/new",verifyToken, CreateCourse);

RoutesCursos.put("/api/cursos/update/:id",verifyToken, UpdateCourse)

export default RoutesCursos;