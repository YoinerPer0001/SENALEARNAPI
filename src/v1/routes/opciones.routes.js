import express from 'express';
import { GetAllOptions, GetOptionsById, createOptions, UpdateOptions } from '../../controllers/opciones.controller.js';
import { verifyToken } from "../../middlewares/verifyToken.js";
import { createValidation, UpdateValidation } from '../../Validators/opciones.validator.js';
import { adminPermiso, AdminInstPermissions } from "../../middlewares/managePermissions.js";

const routesOptions = express();

//obtener todas las opciones

routesOptions.get('/api/v1/options',verifyToken,adminPermiso,GetAllOptions)

//obtener opciones por id
routesOptions.get('/api/v1/options/:id',verifyToken,adminPermiso,GetOptionsById)
//crear opciones

routesOptions.post('/api/v1/options/create',createValidation,verifyToken, createOptions)
//actualizar opciones

routesOptions.put('/api/v1/options/update/:id',UpdateValidation, verifyToken, UpdateOptions)
export default routesOptions;