import express from 'express'
import { verifyToken } from '../Resources/verifyToken.js';
import { GetLocations, createLocations,UpdateLocations } from '../controllers/localizacion.controller.js';

const routesLocation = express();

routesLocation.get('/api/localizacion', verifyToken, GetLocations)

routesLocation.post('/api/localizacion/create', verifyToken, createLocations)

routesLocation.put('/api/localizacion/update/:id', verifyToken, UpdateLocations)

export default routesLocation;