import express from 'express'
import { verifyToken } from '../Resources/verifyToken.js';
import {GetModulesxId, createModules} from '../controllers/modulos_cursos.controller.js'

const routesModCur = express();

routesModCur.get('/api/modulo_curso/:id', GetModulesxId)

routesModCur.post('/api/modulo_curso/create',verifyToken, createModules)

export default routesModCur;