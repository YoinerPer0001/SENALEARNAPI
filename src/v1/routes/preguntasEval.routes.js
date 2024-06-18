import express from 'express'
import {GetQuestionsxId, createQuestion, UpdateQuestions, deleteQuestions} from '../../controllers/preguntasEval.controller.js'
import { verifyToken } from "../../middlewares/verifyToken.js";
import { adminPermiso, AdminInstPermissions } from "../../middlewares/managePermissions.js";
import {createValidation, UpdateValidation} from "../../Validators/preguntasEval.validator.js";

const routesPreguntasEval = express()

routesPreguntasEval.get('/api/v1/preguntasEval/:id',verifyToken,GetQuestionsxId);

routesPreguntasEval.post('/api/v1/preguntasEval/create',createValidation,verifyToken,AdminInstPermissions,createQuestion);

routesPreguntasEval.put('/api/v1/preguntasEval/update/:id',UpdateValidation,verifyToken,AdminInstPermissions,UpdateQuestions);

routesPreguntasEval.delete('/api/v1/preguntasEval/delete/:id', verifyToken, AdminInstPermissions, deleteQuestions)


export default routesPreguntasEval;