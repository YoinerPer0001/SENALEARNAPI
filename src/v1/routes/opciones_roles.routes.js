import express from 'express';
import { verifyToken } from "../../middlewares/verifyToken.js";
import { AsigOptRol, getAllOptionsxRol, updateOptionsRoles } from '../../controllers/opciones_roles.controller.js';
import { createValidation, UpdateValidation } from '../../Validators/opciones_roles.validator.js';

const routesOptionsRoles = express();

//asignar opciones a roles

routesOptionsRoles.post('/api/v1/opciones_roles/create', verifyToken, AsigOptRol);

//obtener opciones de usuarios segun el rol

routesOptionsRoles.get('/api/v1/opciones_roles/rol', verifyToken,createValidation, getAllOptionsxRol)

//actualizar asignaciones de opciones a roles

routesOptionsRoles.put('/api/v1/opciones_roles/update/:id',verifyToken,UpdateValidation, updateOptionsRoles)

export default routesOptionsRoles;