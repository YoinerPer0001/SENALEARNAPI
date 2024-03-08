import express from 'express';
import {verifyToken} from '../Resources/verifyToken.js'
import {getAllInsc} from '../controllers/inscripciones.controller.js'

const routesInscripciones = express();

routesInscripciones.get('/api/inscipciones',verifyToken, getAllInsc)



export default routesInscripciones;