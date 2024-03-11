import express from 'express';
import { GetContModuloxModule, createContModu,UpdateModCur } from '../../controllers/contenido_modulo.controller.js'
import { verifyToken } from "../../middlewares/verifyToken.js";

const contModRoutes = express();

/**
 * @swagger
 * /api/v1/cont_mod/{id}:
 *   get:
 *     tags:
 *      - Contenido de Modulos
 *     summary: Retorna el contenido de un modulo determinado.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: id del modulo.
 *         schema:
 *           type: string
 *           minLenght: 1
 *     responses:
 *       '200':
 *         description: Operación correcta
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *               items:
 *                 type: object
 *              example:
 *                 type: success
 *                 code: 200
 *                 data: [{
                            "Id_Cont": 4,
                            "Tip_Cont": "Audio",
                            "Url_Cont": "https://example.com/english-vocabulary.mp3",
                            "Tit_Cont": "Vocabulario Importante",
                            "Id_Mod_FK": "1"
                        }]
 *       '204':
 *         description: La operación se realizo correctamente, pero no hubo datos que devolver
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *               items:
 *                 type: object
 *              example:
 *                 type: success
 *                 code: 204
 *                 data: {[]}
 *       '403':
 *         description: No autorizado
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *               items:
 *                 type: object
 *               example:
 *                 type: error
 *                 code: 403
 *                 message: No Autorizado
 *       '500':
 *         description: Error de servidor
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *               items:
 *                 type: object
 *               example:
 *                 type: error
 *                 code: 500
 *                 message: algo salio mal
 *       '400':
 *         description:  la solicitud del cliente no pudo ser procesada por el servidor debido a problemas en la sintaxis o el formato de la solicitud
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *               items:
 *                 type: object
 *               example:
 *                 type: error
 *                 code: 400
 *                 message: algo salio mal
 *       
 */
contModRoutes.get('/api/v1/cont_mod/:id', GetContModuloxModule);
/**
 * @swagger
 * /api/v1/cont_mod/create:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Contenido de Modulos
 *     summary: Crea un nuevo contenido para los modulos de los cursos (Solo para roles de ADMIN e Instructor).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Tip_Cont:
 *                 type: integer
 *               Url_Cont:
 *                 type: string
 *               Tit_Cont:
 *                 type: string
 *               Id_Mod_FK:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Operación correcta
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *             example:
 *               type: success
 *               code: 200
 *               data: {"insertId": "1"}
 *       '403':
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *             example:
 *               type: error
 *               code: 403
 *               message: No Autorizado
 *       '500':
 *         description: Error de servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *             example:
 *               type: error
 *               code: 500
 *               message: algo salió mal
 *       '400':
 *         description: La solicitud del cliente no pudo ser procesada por el servidor debido a problemas en la sintaxis o el formato de la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *             example:
 *               type: error
 *               code: 400
 *               message: algo salió mal
 */
contModRoutes.post('/api/v1/cont_mod/create', verifyToken, createContModu)
/**
 * @swagger
 * /api/v1/cont_mod/update/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Contenido de Modulos
 *     summary: Actualizar Contenido de los modulos (Solo para roles de ADMIN e Instructor).
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: id contenido del modulo.
 *         schema:
 *           type: string
 *           minLenght: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Tip_Cont:
 *                 type: integer
 *               Url_Cont:
 *                 type: string
 *               Tit_Cont:
 *                 type: string
 *               Id_Mod_FK:
 *                 type: string
 *            
 *     responses:
 *       '200':
 *         description: Operación correcta
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *             example:
 *               type: success
 *               code: 200
 *               data: {"affectedRows": 1}
 *       '204':
 *         description: La operación se realizó correctamente, pero no hubo datos que devolver
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *             example:
 *               type: success
 *               code: 204
 *               data: []
 *       '403':
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *             example:
 *               type: error
 *               code: 403
 *               message: No Autorizado
 *       '500':
 *         description: Error de servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *             example:
 *               type: error
 *               code: 500
 *               message: algo salió mal
 *       '400':
 *         description: La solicitud del cliente no pudo ser procesada por el servidor debido a problemas en la sintaxis o el formato de la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *             example:
 *               type: error
 *               code: 400
 *               message: algo salió mal
 */

contModRoutes.put('/api/v1/cont_mod/update/:id', verifyToken, UpdateModCur);

export default contModRoutes;