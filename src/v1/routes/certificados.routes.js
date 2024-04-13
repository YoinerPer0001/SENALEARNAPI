import express from 'express';
import { getAllCertificates, getxIdUser, getCertificatesBycurso, createCert } from '../../controllers/certificados.controller.js';
import { verifyToken } from "../../middlewares/verifyToken.js";

const routesCertificados = express();

routesCertificados.get('/api/v1/certificados',verifyToken,getAllCertificates)

routesCertificados.get('/api/v1/certificados/usuario/:id',verifyToken, getxIdUser)

routesCertificados.get('/api/v1/certificados/curso/:id', verifyToken, getCertificatesBycurso)

routesCertificados.post('/api/v1/certificados/create', verifyToken, createCert);

export default routesCertificados;