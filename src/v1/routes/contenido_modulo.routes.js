import express from 'express';
import { GetContModuloxModule, createContModu,UpdateModCur, deleteCont } from '../../controllers/contenido_modulo.controller.js'
import { verifyToken } from "../../middlewares/verifyToken.js";
import { createValidation,UpdateValidation } from '../../Validators/contenido_modulo.validator.js';
import { adminPermiso, AdminInstPermissions } from "../../middlewares/managePermissions.js";

const contModRoutes = express();


contModRoutes.get('/api/v1/cont_mod/:id', GetContModuloxModule);

contModRoutes.post('/api/v1/cont_mod/create',createValidation, verifyToken,AdminInstPermissions,createContModu)

contModRoutes.put('/api/v1/cont_mod/update/:id',UpdateValidation, verifyToken,AdminInstPermissions, UpdateModCur);

contModRoutes.delete('/api/v1/cont_mod/delete/:id',verifyToken, adminPermiso, deleteCont)

export default contModRoutes;