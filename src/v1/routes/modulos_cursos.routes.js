import express from 'express'
import { verifyToken } from "../../middlewares/verifyToken.js";
import {GetModulesxId, createModules,UpdateModules, deleteMod, GetModulesxIdAdmin} from '../../controllers/modulos_cursos.controller.js'
import { createValidation,UpdateValidation } from '../../Validators/modulos_cursos.validator.js';
import { adminPermiso, AdminInstPermissions } from "../../middlewares/managePermissions.js";

const routesModCur = express();


routesModCur.get('/api/v1/modulo_curso/:id', GetModulesxId)

routesModCur.get('/api/v1/modulo/curso/:id', verifyToken , AdminInstPermissions, GetModulesxIdAdmin)


routesModCur.post('/api/v1/modulo_curso/create',createValidation,verifyToken,AdminInstPermissions, createModules)


routesModCur.put('/api/v1/modulo_curso/update/:id',UpdateValidation,verifyToken,AdminInstPermissions, UpdateModules)

routesModCur.delete('/api/v1/modulo_curso/delete/:id',verifyToken,AdminInstPermissions, deleteMod)

export default routesModCur;