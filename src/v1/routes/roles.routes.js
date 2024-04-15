import express from 'express';
import {GetRoles,GetRolesxId, createRoles,UpdateRoles} from '../../controllers/roles.controller.js'
import { verifyToken } from "../../middlewares/verifyToken.js";
import { createValidation, UpdateValidation } from '../../Validators/roles.validator.js';

const routesRoles = express();


routesRoles.get('/api/v1/roles',verifyToken, GetRoles);

routesRoles.get('/api/v1/roles/:id',verifyToken, GetRolesxId);

routesRoles.post('/api/v1/roles/create',verifyToken, createValidation,createRoles);

routesRoles.put('/api/v1/roles/update/:id',verifyToken,UpdateValidation, UpdateRoles);

export default routesRoles;