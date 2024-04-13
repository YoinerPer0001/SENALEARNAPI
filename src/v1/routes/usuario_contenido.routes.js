import express from 'express';
import {createUsuario_Cont} from '../../controllers/usuario_contenidos.controller.js'
import { verifyToken } from "../../middlewares/verifyToken.js";

const routesUsuario_Cont = express();

routesUsuario_Cont.post('/api/v1/usuarios/contenido', verifyToken, createUsuario_Cont)

export default routesUsuario_Cont;