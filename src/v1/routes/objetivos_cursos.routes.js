import express from "express"
import {GetAllObjxCourse, createObjCour, UpdateObjetivesCour, deleteObj} from "../../controllers/objetivos_cursos.controller.js"
import { verifyToken } from "../../middlewares/verifyToken.js";
import { createValidation, UpdateValidation } from "../../Validators/objetivos_cursos_validator.js";
import { adminPermiso, AdminInstPermissions } from "../../middlewares/managePermissions.js";

const routesObjCourses = express();



routesObjCourses.get("/api/v1/obj_cursos/:id", GetAllObjxCourse );

routesObjCourses.post("/api/v1/obj_cursos/create",createValidation, verifyToken,AdminInstPermissions, createObjCour)

routesObjCourses.put("/api/v1/obj_cursos/update/:id",UpdateValidation, verifyToken,AdminInstPermissions,UpdateObjetivesCour)

routesObjCourses.delete('/api/v1/obj_cursos/delete/:id', verifyToken,adminPermiso, deleteObj)
export default routesObjCourses;