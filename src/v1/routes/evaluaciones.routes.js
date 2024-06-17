import express from 'express';
import { GetEvaluaciones, createEvaluation, UpdateEvaluations, GetEvalxId, GetEvalxState, GetEvalxModule, deleteEval } from '../../controllers/evaluacion.controller.js'
import { verifyToken } from '../../middlewares/verifyToken.js';
import { adminPermiso, AdminInstPermissions } from "../../middlewares/managePermissions.js";

import {createValidation, UpdateValidation} from "../../Validators/evaluaciones.validator.js";

const routesEvaluaciones = express();

routesEvaluaciones.get('/api/v1/evaluations', verifyToken,adminPermiso, GetEvaluaciones)

routesEvaluaciones.get('/api/v1/evaluations/:id', verifyToken,AdminInstPermissions, GetEvalxId)

routesEvaluaciones.get('/api/v1/evaluations/status/:status', verifyToken, AdminInstPermissions, GetEvalxState)

routesEvaluaciones.get('/api/v1/evaluations/module/:module', verifyToken,AdminInstPermissions, GetEvalxModule)

routesEvaluaciones.post('/api/v1/evaluations/create',createValidation, verifyToken,AdminInstPermissions, createEvaluation)

routesEvaluaciones.put('/api/v1/evaluations/update/:id',UpdateValidation, verifyToken,AdminInstPermissions, UpdateEvaluations)

routesEvaluaciones.delete('/api/v1/evaluations/detete/:id',verifyToken, adminPermiso,deleteEval )


export default routesEvaluaciones;