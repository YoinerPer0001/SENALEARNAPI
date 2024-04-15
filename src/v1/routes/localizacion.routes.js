import express from 'express'
import { verifyToken } from "../../middlewares/verifyToken.js";
import { GetLocations, createLocations,UpdateLocations,GetLocationsxUser } from '../../controllers/localizacion.controller.js';
import { createValidation, UpdateValidation } from '../../Validators/localizacion.validator.js';

const routesLocation = express();


routesLocation.get('/api/v1/localizaciones', verifyToken, GetLocations)

routesLocation.get('/api/v1/localizaciones/user/:id',verifyToken,GetLocationsxUser)

routesLocation.post('/api/v1/localizaciones/create', verifyToken,createValidation, createLocations)

routesLocation.put('/api/v1/localizaciones/update/:id', verifyToken,UpdateValidation, UpdateLocations)

export default routesLocation;