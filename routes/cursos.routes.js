import express from "express";
import { getCursos, getCuCat,CreateCourse} from "../controllers/cursos.controller.js";

const RoutesCursos = express();

RoutesCursos.get("/api/cursos",getCursos);

RoutesCursos.get("/api/cursos/:id",getCuCat);

RoutesCursos.post("/api/cursos/new",CreateCourse);

export default RoutesCursos;