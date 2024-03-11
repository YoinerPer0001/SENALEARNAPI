import express from 'express';
import { verifyToken } from "../../middlewares/verifyToken.js";
import { getAllInsc, newInsciption, editInsciption, deleteInsciption, getInscxUser, getInscxCurso } from '../../controllers/inscripciones.controller.js'

const routesInscripciones = express();
/**
 * @swagger
 * /api/v1/inscripciones:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: obtener lista de todas las inscripciones  (SOLO PARA ADMIN).
 *     description: Retorna la lista de todas las inscripciones de usuarios.
 *     tags:
 *      - Inscripciones
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
                                "Id_User_FK": "1",
                                "Id_Cur_FK": 1,
                                "fecha_insc": "aaaa-mm-dd"
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
 */
routesInscripciones.get('/api/v1/inscripciones', verifyToken, getAllInsc)
/**
 * @swagger
 * /api/v1/inscripciones/user/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *      - Inscripciones
 *     summary: Retorna la lista de cursos en los que el usuario se encuentra inscrito (solo roles de ADMIN y Estudiantes).
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
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
                                "Id_Cur": "1",
                                "Nom_Cur": "Curso de Programación Avanzada",
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
 *       
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
 */
routesInscripciones.get('/api/v1/inscripciones/user/:id', verifyToken, getInscxUser)
/**
 * @swagger
 * /api/v1/inscripciones/course/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *      - Inscripciones
 *     summary: Retorna la lista de usuarios que se encuentran inscritos en un curso especifico (solo roles de Admin e Instructor).
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
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
                                "Id_Cur": "1",
                                "Nom_Cur": "Curso de Programación Avanzada",
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
 *       
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
 */
routesInscripciones.get('/api/v1/inscripciones/course/:id', verifyToken, getInscxCurso)
/**
 * @swagger
 * /api/v1/inscripciones/create:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Inscripciones
 *     summary: Crear una nueva inscripcion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Id_User:
 *                 type: string
 *               Id_Cur:
 *                 type: string
 *               fecha_insc:
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
routesInscripciones.post('/api/v1/inscripciones/create', verifyToken, newInsciption)
/**
 * @swagger
 * /api/v1/inscripciones/update/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Inscripciones
 *     summary: Actualizar inscripciones (Solo para rol de ADMIN).
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: id user.
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
 *               Id_Cur:
 *                 type: string
 *               Id_Cur_New:
 *                 type: string
 *               Prog_Cur:
 *                 type: string
 *               fecha_insc:
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
routesInscripciones.put('/api/v1/inscripciones/update/:id', verifyToken, editInsciption)

routesInscripciones.delete('/api/v1/inscripciones/delete/:id_User/:id_Curso', verifyToken, deleteInsciption)




export default routesInscripciones;