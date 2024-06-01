import express from 'express';
import {createUsuario_Cont, GetContVistosXUsuario, editContentView, deleteUserCont} from '../../controllers/usuario_contenidos.controller.js'
import { verifyToken } from "../../middlewares/verifyToken.js";
import {createValidation, UpdateValidation} from "../../Validators/usuario_contenidos.validators.js";
import { adminPermiso, AdminInstPermissions } from "../../middlewares/managePermissions.js";

const routesUsuario_Cont = express();

routesUsuario_Cont.post('/api/v1/usuarios/contenido/create',createValidation,verifyToken,adminPermiso, createUsuario_Cont)

//retorna contenido visto ordenado por fecha
routesUsuario_Cont.get('/api/v1/usuarios/contenido/:id',verifyToken, GetContVistosXUsuario)

routesUsuario_Cont.put('/api/v1/usuarios/contenido/update/:id',UpdateValidation,verifyToken,adminPermiso, editContentView)

routesUsuario_Cont.delete('/api/v1/usuarios/contenido/delete/:id',verifyToken, adminPermiso, deleteUserCont)


export default routesUsuario_Cont;