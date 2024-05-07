import express from 'express';
import { GetEvaluaciones, createEvaluation, UpdateEvaluations, GetEvalxId, GetEvalxState, GetEvalxModule } from '../../controllers/evaluacion.controller.js'
import { verifyToken } from '../../middlewares/verifyToken.js';
import { adminPermiso, AdminInstPermissions } from "../../middlewares/managePermissions.js";

import {createValidation, UpdateValidation} from "../../Validators/evaluaciones.validator.js";

const routesEvaluaciones = express();

routesEvaluaciones.get('/api/v1/evaluaciones', verifyToken,adminPermiso, GetEvaluaciones)

routesEvaluaciones.get('/api/v1/evaluaciones/:id', verifyToken,adminPermiso, GetEvalxId)

routesEvaluaciones.get('/api/v1/evaluaciones/status/:status', verifyToken, adminPermiso, GetEvalxState)

routesEvaluaciones.get('/api/v1/evaluaciones/module/:module', verifyToken,AdminInstPermissions, GetEvalxModule)

routesEvaluaciones.post('/api/v1/evaluaciones/create',createValidation, verifyToken,AdminInstPermissions, createEvaluation)

routesEvaluaciones.put('/api/v1/evaluaciones/update/:id',UpdateValidation, verifyToken,AdminInstPermissions, UpdateEvaluations)


export default routesEvaluaciones;