import express from "express";
import { getCursos } from "../controllers/cursos.controller.js";

const RoutesCursos = express();

RoutesCursos.get("/api/cursos",getCursos);

export default RoutesCursos;