import express from 'express'
import { verifyToken } from "../../middlewares/verifyToken.js";
import {GetModulesxId, createModules,UpdateModules} from '../../controllers/modulos_cursos.controller.js'
import { createValidation,UpdateValidation } from '../../Validators/modulos_cursos.validator.js';

const routesModCur = express();


routesModCur.get('/api/v1/modulo_curso/:id', GetModulesxId)


routesModCur.post('/api/v1/modulo_curso/create',verifyToken,createValidation, createModules)


routesModCur.put('/api/v1/modulo_curso/update/:id',verifyToken,UpdateValidation, UpdateModules)

export default routesModCur;