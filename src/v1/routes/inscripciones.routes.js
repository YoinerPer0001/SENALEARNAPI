import express from 'express';
import { verifyToken } from "../../middlewares/verifyToken.js";
import { getAllInsc, newInsciption, editInsciption, getInscxUser, getInscxCurso } from '../../controllers/inscripciones.controller.js'
import { createValidation, UpdateValidation } from '../../Validators/inscripciones.validator.js';

const routesInscripciones = express();

routesInscripciones.get('/api/v1/inscripciones', verifyToken, getAllInsc)

routesInscripciones.get('/api/v1/inscripciones/user/:id', verifyToken, getInscxUser)

routesInscripciones.get('/api/v1/inscripciones/course/:id', verifyToken, getInscxCurso)

routesInscripciones.post('/api/v1/inscripciones/create', verifyToken,createValidation, newInsciption)

routesInscripciones.put('/api/v1/inscripciones/update/:id', verifyToken,UpdateValidation, editInsciption)


export default routesInscripciones;