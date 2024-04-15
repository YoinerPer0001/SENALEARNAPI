import express from 'express';
import {GetAllTokens, GetTokenssxUser,InsertToken, GetTokenssxTipo, UpdateTokens} from '../../controllers/tokens.controller.js'
import { verifyToken } from "../../middlewares/verifyToken.js";
import { createValidation, UpdateValidation } from '../../Validators/tokens.validator.js';


const routesTokens = express();

routesTokens.get('/api/v1/tokens', verifyToken, GetAllTokens)

routesTokens.get('/api/v1/tokens/user/:id',verifyToken, GetTokenssxUser)

routesTokens.get('/api/v1/tokens/type/:tipo',verifyToken, GetTokenssxTipo)

routesTokens.post('/api/v1/tokens/create',verifyToken,createValidation, InsertToken);

routesTokens.put('/api/v1/tokens/update/:id',verifyToken,UpdateValidation, UpdateTokens)


export default routesTokens;