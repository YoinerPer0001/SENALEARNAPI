import express from "express";
import { getCursos, getCuCat,CreateCourse, UpdateCourse, getCursoId} from "../../controllers/cursos.controller.js";
import { verifyToken } from "../../middlewares/verifyToken.js";
import { createValidation, UpdateValidation } from "../../Validators/cursos.validator.js";

const RoutesCursos = express();


RoutesCursos.get("/api/v1/cursos", getCursos);


RoutesCursos.get("/api/v1/cursos/categoria/:id",getCuCat);

RoutesCursos.post("/api/v1/cursos/new",verifyToken,createValidation, CreateCourse);

RoutesCursos.put("/api/v1/cursos/update/:id",verifyToken, UpdateValidation, UpdateCourse)

RoutesCursos.get("/api/v1/cursos/:id",getCursoId);

export default RoutesCursos;