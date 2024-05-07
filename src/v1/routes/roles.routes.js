import express from 'express';
import {GetRoles,GetRolesxId, createRoles,UpdateRoles} from '../../controllers/roles.controller.js'
import { verifyToken } from "../../middlewares/verifyToken.js";
import { createValidation, UpdateValidation } from '../../Validators/roles.validator.js';
import { adminPermiso, AdminInstPermissions } from "../../middlewares/managePermissions.js";

const routesRoles = express();


routesRoles.get('/api/v1/roles',verifyToken,adminPermiso, GetRoles);

routesRoles.get('/api/v1/roles/:id',verifyToken,adminPermiso, GetRolesxId);

routesRoles.post('/api/v1/roles/create',createValidation,verifyToken,adminPermiso,createRoles);

routesRoles.put('/api/v1/roles/update/:id',UpdateValidation,verifyToken,adminPermiso, UpdateRoles);

export default routesRoles;