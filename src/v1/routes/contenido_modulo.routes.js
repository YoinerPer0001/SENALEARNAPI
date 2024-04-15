import express from 'express';
import { GetContModuloxModule, createContModu,UpdateModCur } from '../../controllers/contenido_modulo.controller.js'
import { verifyToken } from "../../middlewares/verifyToken.js";
import { createValidation,UpdateValidation } from '../../Validators/contenido_modulo.validator.js';

const contModRoutes = express();


contModRoutes.get('/api/v1/cont_mod/:id', GetContModuloxModule);

contModRoutes.post('/api/v1/cont_mod/create', verifyToken, createValidation,createContModu)

contModRoutes.put('/api/v1/cont_mod/update/:id', verifyToken,UpdateValidation, UpdateModCur);

export default contModRoutes;