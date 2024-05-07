import express from 'express'
import { verifyToken } from "../../middlewares/verifyToken.js";
import { GetLocations, createLocations, UpdateLocations, GetLocationsxUser } from '../../controllers/localizacion.controller.js';
import { createValidation, UpdateValidation } from '../../Validators/localizacion.validator.js';
import { adminPermiso, AdminInstPermissions } from "../../middlewares/managePermissions.js";

const routesLocation = express();


routesLocation.get('/api/v1/locations', verifyToken,adminPermiso, GetLocations)

routesLocation.get('/api/v1/locations/user/:id', verifyToken,adminPermiso, GetLocationsxUser)

routesLocation.post('/api/v1/locations/create', createValidation, verifyToken,adminPermiso, createLocations)

routesLocation.put('/api/v1/locations/update/:id', UpdateValidation, verifyToken,adminPermiso, UpdateLocations)

export default routesLocation;