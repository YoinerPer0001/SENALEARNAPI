import express from 'express';
import { GetEvaluaciones, createEvaluation, UpdateEvaluations, GetEvalxId, GetEvalxState, GetEvalxModule } from '../../controllers/evaluacion.controller.js'
import { verifyToken } from '../../middlewares/verifyToken.js';

import {createValidation, UpdateValidation} from "../../Validators/evaluaciones.validator.js";

const routesEvaluaciones = express();

routesEvaluaciones.get('/api/v1/evaluaciones', verifyToken, GetEvaluaciones)

routesEvaluaciones.get('/api/v1/evaluaciones/:id', verifyToken, GetEvalxId)

routesEvaluaciones.get('/api/v1/evaluaciones/status/:status', verifyToken, GetEvalxState)

routesEvaluaciones.get('/api/v1/evaluaciones/module/:module', verifyToken, GetEvalxModule)

routesEvaluaciones.post('/api/v1/evaluaciones/create',createValidation, verifyToken, createEvaluation)

routesEvaluaciones.put('/api/v1/evaluaciones/update/:id',UpdateValidation, verifyToken, UpdateEvaluations)


export default routesEvaluaciones;