import express from 'express';
import { getAllCertificates, getxIdUser, getCertificatesBycurso, createCert , updateCert} from '../../controllers/certificados.controller.js';
import { verifyToken } from "../../middlewares/verifyToken.js";
import { adminPermiso, AdminInstPermissions } from "../../middlewares/managePermissions.js";
import {createValidation, UpdateValidation} from "../../Validators/certificados.validator.js";

const routesCertificados = express();

routesCertificados.get('/api/v1/certificados',verifyToken,adminPermiso,getAllCertificates)

routesCertificados.get('/api/v1/certificados/usuario/:id',verifyToken, getxIdUser)

routesCertificados.get('/api/v1/certificados/curso/:id', verifyToken,AdminInstPermissions, getCertificatesBycurso)

routesCertificados.post('/api/v1/certificados/create',createValidation, verifyToken,adminPermiso, createCert);

routesCertificados.put('/api/v1/certificados/update/:id',UpdateValidation, verifyToken,adminPermiso, updateCert);

export default routesCertificados;