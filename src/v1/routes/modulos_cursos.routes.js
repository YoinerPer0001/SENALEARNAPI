import express from 'express'
import { verifyToken } from "../../middlewares/verifyToken.js";
import {GetModulesxId, createModules,UpdateModules} from '../../controllers/modulos_cursos.controller.js'
import { createValidation,UpdateValidation } from '../../Validators/modulos_cursos.validator.js';

const routesModCur = express();

/**
 * @swagger
 * /api/v1/modulo_curso/{id}:
 *   get:
 *     tags:
 *      - Modulos de Cursos
 *     summary: Retorna la lista de modulos que contiene un curso.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: id del curso.
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
 *                 data: [
 *                         {
 *                          "Id_Mod": "1",
 *                           "Tit_Mod": "Conceptos Básicos de Programación",
 *                           "Est_Mod": 0,
 *                           "Id_Cur_FK": "1",
 *                           "Horas_Cont_Mod": 10
 *                         }
 *                       ]
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
 *       '103':
 *         description: los datos no coinciden con los alojados en la base de datos
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *               items:
 *                 type: object
 *               example:
 *                 type: error
 *                 code: 103
 *                 message: algo salio mal
 */
routesModCur.get('/api/v1/modulo_curso/:id', GetModulesxId)
/**
 * @swagger
 * /api/v1/modulo_curso/create:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Modulos de Cursos
 *     summary: Crear un nuevo objetivo del curso (Solo para roles de Admin e Instructor).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Tit_Mod:
 *                 type: string
 *               Id_Cur: 
 *                 type: string
 *               Horas_Cont_Mod:
 *                 type: integer   
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

routesModCur.post('/api/v1/modulo_curso/create',verifyToken,createValidation, createModules)

/**
 * @swagger
 * /api/v1/modulo_curso/update/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Modulos de Cursos
 *     summary: Actualizar modulos de cursos, el dato que se envia se actualiza, no es necesario enviarlos todos si no se requiere (Solo para roles de ADMIN e Instructor).
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: id del modulo
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
 *               Tit_Mod:
 *                 type: string
 *               Est_Mod:
 *                 type: string
 *               Id_Cur:
 *                 type: string
 *               Horas_Cont_Mod:
 *                 type: integer
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
routesModCur.put('/api/v1/modulo_curso/update/:id',verifyToken,UpdateValidation, UpdateModules)

export default routesModCur;