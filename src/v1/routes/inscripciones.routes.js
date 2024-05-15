import express from 'express';
import { verifyToken } from "../../middlewares/verifyToken.js";
import { getAllInsc, newInsciption, editInsciption, getInscxUser, getInscxCurso, deleteInsc } from '../../controllers/inscripciones.controller.js'
import { createValidation, UpdateValidation } from '../../Validators/inscripciones.validator.js';
import { adminPermiso, AdminInstPermissions } from "../../middlewares/managePermissions.js";

const routesInscripciones = express();

routesInscripciones.get('/api/v1/inscription', verifyToken,adminPermiso, getAllInsc)

routesInscripciones.get('/api/v1/inscription/user/:id', verifyToken, getInscxUser)

routesInscripciones.get('/api/v1/inscription/course/:id', verifyToken,AdminInstPermissions, getInscxCurso)

routesInscripciones.post('/api/v1/inscription/create',createValidation, verifyToken, newInsciption)

routesInscripciones.put('/api/v1/inscription/update/:id',UpdateValidation, verifyToken,adminPermiso, editInsciption)

routesInscripciones.delete('/api/v1/inscription/delete/user/:user/course/:course', verifyToken,adminPermiso, deleteInsc)

export default routesInscripciones;