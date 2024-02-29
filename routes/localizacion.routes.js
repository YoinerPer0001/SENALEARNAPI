import express from 'express'
import { verifyToken } from '../Resources/verifyToken.js';
import { GetLocations } from '../controllers/localizacion.controller.js';

const routesLocation = express();

routesLocation.get('/api/localizaciones', verifyToken, GetLocations)



export default routesLocation;