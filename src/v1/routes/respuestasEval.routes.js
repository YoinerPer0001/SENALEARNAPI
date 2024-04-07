import express from 'express'
import {GetAnswersxId, createAnswer, UpdateAnswers} from '../../controllers/respuestasEval.controller.js'
import { verifyToken } from "../../middlewares/verifyToken.js";


const routesRespuestasEval =  express();

routesRespuestasEval.get('/api/v1/respuestasEval/:id', verifyToken,GetAnswersxId)

export default routesRespuestasEval;