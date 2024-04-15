import express from 'express'
import {GetAnswersxId, createAnswer, UpdateAnswers} from '../../controllers/respuestasEval.controller.js'
import { verifyToken } from "../../middlewares/verifyToken.js";

import {createValidation, UpdateValidation} from "../../Validators/respuestasEval.validator.js";


const routesRespuestasEval =  express();

routesRespuestasEval.get('/api/v1/respuestasEval/:id', verifyToken, GetAnswersxId)

routesRespuestasEval.post('/api/v1/respuestasEval/create',createValidation, verifyToken, createAnswer)

routesRespuestasEval.put('/api/v1/respuestasEval/update/:id',UpdateValidation, verifyToken, UpdateAnswers)

export default routesRespuestasEval;