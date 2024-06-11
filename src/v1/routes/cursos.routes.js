import express from "express";
import { getCursos, getCuCat,CreateCourse, UpdateCourse, getCursoId, deleteCur} from "../../controllers/cursos.controller.js";
import { verifyToken } from "../../middlewares/verifyToken.js";
import { createValidation, UpdateValidation } from "../../Validators/cursos.validator.js";
import { adminPermiso, AdminInstPermissions } from "../../middlewares/managePermissions.js";

const RoutesCursos = express();


RoutesCursos.get("/api/v1/courses", getCursos);

RoutesCursos.get("/api/v1/courses/category/:id",getCuCat);

RoutesCursos.post("/api/v1/courses/new",createValidation,verifyToken,AdminInstPermissions, CreateCourse);

RoutesCursos.put("/api/v1/courses/update/:id",UpdateValidation,verifyToken,AdminInstPermissions,  UpdateCourse)

RoutesCursos.get("/api/v1/courses/:id",getCursoId);

RoutesCursos.delete('/api/v1/courses/delete/:id', verifyToken, AdminInstPermissions, deleteCur)

export default RoutesCursos;