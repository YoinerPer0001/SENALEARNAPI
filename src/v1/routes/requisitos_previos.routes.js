import express from 'express'
import {GetReqxCurso, createReq, UpdateReq} from '../../controllers/requisitos_previos.controller.js'
import { verifyToken } from "../../middlewares/verifyToken.js";
import { adminPermiso, AdminInstPermissions } from "../../middlewares/managePermissions.js";
import {createValidation, UpdateValidation} from "../../Validators/requisitos_previos.validator.js";

const routesReqPrev= express()

routesReqPrev.get('/api/v1/curso/req-previos/:id', GetReqxCurso )

routesReqPrev.post('/api/v1/curso/req-previos/create',createValidation, verifyToken,AdminInstPermissions, createReq )

routesReqPrev.put('/api/v1/curso/req-previos/update/:id',UpdateValidation, verifyToken,AdminInstPermissions, UpdateReq )

export default routesReqPrev;