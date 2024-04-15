import express from 'express'
import {GetQuestionsxId, createQuestion, UpdateQuestions} from '../../controllers/preguntasEval.controller.js'
import { verifyToken } from "../../middlewares/verifyToken.js";

import {createValidation, UpdateValidation} from "../../Validators/respuestasEval.validator.js";

const routesPreguntasEval = express()

routesPreguntasEval.get('/api/v1/preguntasEval/:id',verifyToken,GetQuestionsxId);

routesPreguntasEval.post('/api/v1/preguntasEval/create',createValidation,verifyToken,createQuestion);

routesPreguntasEval.put('/api/v1/preguntasEval/update/:id',UpdateValidation,verifyToken,UpdateQuestions);


export default routesPreguntasEval;