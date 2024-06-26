import express from 'express';
import { verifyToken } from "../../middlewares/verifyToken.js";
import { AsigOptRol, getAllOptionsxRol, updateOptionsRoles, deleteOptRol } from '../../controllers/opciones_roles.controller.js';
import { createValidation, UpdateValidation } from '../../Validators/opciones_roles.validator.js';
import { adminPermiso, AdminInstPermissions } from "../../middlewares/managePermissions.js";

const routesOptionsRoles = express();

//asignar opciones a roles

routesOptionsRoles.post('/api/v1/opciones_roles/create', createValidation, verifyToken,adminPermiso, AsigOptRol);

//obtener opciones de usuarios segun el rol

routesOptionsRoles.get('/api/v1/opciones_roles/rol/:id',verifyToken, getAllOptionsxRol)

//actualizar asignaciones de opciones a roles

routesOptionsRoles.put('/api/v1/opciones_roles/update/:id',UpdateValidation, verifyToken,adminPermiso, updateOptionsRoles)

routesOptionsRoles.delete('/api/v1/opciones_roles/delete/:option/:rol',verifyToken,adminPermiso,deleteOptRol)

export default routesOptionsRoles;