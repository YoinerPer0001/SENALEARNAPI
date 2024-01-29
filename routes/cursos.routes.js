import express from "express";
import { getCursos, getCuCat} from "../controllers/cursos.controller.js";

const RoutesCursos = express();

RoutesCursos.get("/api/cursos",getCursos);

RoutesCursos.get("/api/cursos/:id",getCuCat);

export default RoutesCursos;