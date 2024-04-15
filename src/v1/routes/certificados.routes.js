import express from 'express';
import { getAllCertificates, getxIdUser, getCertificatesBycurso, createCert , updateCert} from '../../controllers/certificados.controller.js';
import { verifyToken } from "../../middlewares/verifyToken.js";

import {createValidation, UpdateValidation} from "../../Validators/certificados.validator.js";

const routesCertificados = express();

routesCertificados.get('/api/v1/certificados',verifyToken,getAllCertificates)

routesCertificados.get('/api/v1/certificados/usuario/:id',verifyToken, getxIdUser)

routesCertificados.get('/api/v1/certificados/curso/:id', verifyToken, getCertificatesBycurso)

routesCertificados.post('/api/v1/certificados/create',createValidation, verifyToken, createCert);

routesCertificados.put('/api/v1/certificados/update/:id',UpdateValidation, verifyToken, updateCert);

export default routesCertificados;