import express from "express"
import {GetAllObjxCourse, createObjCour, UpdateObjetivesCour} from "../../controllers/objetivos_cursos.controller.js"
import { verifyToken } from "../../middlewares/verifyToken.js";
import { createValidation, UpdateValidation } from "../../Validators/objetivos_cursos_validator.js";

const routesObjCourses = express();



routesObjCourses.get("/api/v1/obj_cursos/:id", GetAllObjxCourse );

routesObjCourses.post("/api/v1/obj_cursos/create", verifyToken,createValidation, createObjCour)

routesObjCourses.put("/api/v1/obj_cursos/update/:id",verifyToken,UpdateValidation, UpdateObjetivesCour)

export default routesObjCourses;