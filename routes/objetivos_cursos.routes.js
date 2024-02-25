import express from "express"
import {GetAllObjxCourse, createObjCour, UpdateObjetivesCour} from "../controllers/objetivos_cursos.controller.js"
import { verifyToken  } from "../Resources/verifyToken.js";

const routesObjCourses = express();

routesObjCourses.get("/api/obj_cursos/:id", GetAllObjxCourse );

routesObjCourses.post("/api/obj_cursos/create", verifyToken, createObjCour)

routesObjCourses.put("/api/obj_cursos/update/:id",verifyToken, UpdateObjetivesCour)

export default routesObjCourses;