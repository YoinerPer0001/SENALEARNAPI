import express from 'express';
import {GetAllTokens, GetTokenssxUser,InsertToken, GetTokenssxTipo, UpdateTokens} from '../../controllers/tokens.controller.js'
import { verifyToken } from "../../middlewares/verifyToken.js";
import { createValidation, UpdateValidation } from '../../Validators/tokens.validator.js';
import { adminPermiso, AdminInstPermissions } from "../../middlewares/managePermissions.js";

const routesTokens = express();

routesTokens.get('/api/v1/tokens', verifyToken,adminPermiso, GetAllTokens)

routesTokens.get('/api/v1/tokens/user/:id',verifyToken,adminPermiso, GetTokenssxUser)

routesTokens.get('/api/v1/tokens/type/:tipo',verifyToken,adminPermiso, GetTokenssxTipo)

routesTokens.post('/api/v1/tokens/create',createValidation,verifyToken,adminPermiso,InsertToken);

routesTokens.put('/api/v1/tokens/update/:id',UpdateValidation,verifyToken,adminPermiso, UpdateTokens)


export default routesTokens;