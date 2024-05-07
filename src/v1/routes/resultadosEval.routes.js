import express from 'express'
import {createResult, GetUserResults, editResult} from '../../controllers/resultadosEval.controller.js'
import { verifyToken } from "../../middlewares/verifyToken.js";
import { adminPermiso, AdminInstPermissions } from "../../middlewares/managePermissions.js";
import {createValidation, UpdateValidation,GetResultValidation} from "../../Validators/resultadosEval.validator.js";
const routesResult = express();

routesResult.post('/api/evaluations/evaluate',createValidation,verifyToken,createResult )

routesResult.post('/api/evaluations/user/result/list',GetResultValidation,verifyToken,GetUserResults)

routesResult.put('/api/evaluations/result/update/:id',UpdateValidation,verifyToken,adminPermiso,editResult)

export default routesResult;