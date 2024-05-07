import express from 'express'
import {GetAnswersxId, createAnswer, UpdateAnswers} from '../../controllers/respuestasEval.controller.js'
import { verifyToken } from "../../middlewares/verifyToken.js";
import { adminPermiso, AdminInstPermissions } from "../../middlewares/managePermissions.js";

import {createValidation, UpdateValidation} from "../../Validators/respuestasEval.validator.js";


const routesRespuestasEval =  express();

routesRespuestasEval.get('/api/v1/respuestasEval/:id', verifyToken, GetAnswersxId)

routesRespuestasEval.post('/api/v1/respuestasEval/create',createValidation, verifyToken,AdminInstPermissions, createAnswer)

routesRespuestasEval.put('/api/v1/respuestasEval/update/:id',UpdateValidation, verifyToken,AdminInstPermissions, UpdateAnswers)

export default routesRespuestasEval;