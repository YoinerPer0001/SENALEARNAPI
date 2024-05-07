import express from 'express';
import { verifyToken } from "../../middlewares/verifyToken.js";
import { getAllInsc, newInsciption, editInsciption, getInscxUser, getInscxCurso } from '../../controllers/inscripciones.controller.js'
import { createValidation, UpdateValidation } from '../../Validators/inscripciones.validator.js';
import { adminPermiso, AdminInstPermissions } from "../../middlewares/managePermissions.js";

const routesInscripciones = express();

routesInscripciones.get('/api/v1/inscripciones', verifyToken,adminPermiso, getAllInsc)

routesInscripciones.get('/api/v1/inscripciones/user/:id', verifyToken, getInscxUser)

routesInscripciones.get('/api/v1/inscripciones/course/:id', verifyToken,AdminInstPermissions, getInscxCurso)

routesInscripciones.post('/api/v1/inscripciones/create',createValidation, verifyToken, newInsciption)

routesInscripciones.put('/api/v1/inscripciones/update/:id',UpdateValidation, verifyToken,adminPermiso, editInsciption)


export default routesInscripciones;