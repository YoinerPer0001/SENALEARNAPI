import express from "express";
import { getCursos, getCuCat,CreateCourse, UpdateCourse} from "../controllers/cursos.controller.js";
import { verifyToken } from "../Resources/verifyToken.js";

const RoutesCursos = express();

/**
 * @swagger
 * /api/cursos:
 *   get:
 *     summary: obtener lista de cursos.
 *     description: Retorna la lista de todos los cursos publicados.
 *     tags:
 *      - Cursos
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
                                "Des_Cur": "Este curso cubre temas avanzados de programación en varios lenguajes.",
                                "Hor_Cont_Total": 40,
                                "Fech_Crea_Cur": "2024-02-07T05:00:00.000Z",
                                "Id_Cat_FK": "1",
                                "Fot_Cur": "https://ejemplo.com/imagen_curso.jpg",
                                "Est_Cur": 2
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
RoutesCursos.get("/api/cursos", getCursos);

/**
 * @swagger
 * /api/cursos/categoria/{id}:
 *   get:
 *     tags:
 *      - Cursos
 *     summary: Retorna la lista de cursos que hacen parte de una categoria.
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
                                "Des_Cur": "Este curso cubre temas avanzados de programación en varios lenguajes.",
                                "Hor_Cont_Total": 40,
                                "Fech_Crea_Cur": "2024-02-07T05:00:00.000Z",
                                "Id_Cat_FK": "1",
                                "Fot_Cur": "https://ejemplo.com/imagen_curso.jpg",
                                "Est_Cur": 2
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
RoutesCursos.get("/api/cursos/categoria/:id",getCuCat);
/**
 * @swagger
 * /api/cursos/new:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Cursos
 *     summary: Crear un nuevo curso (Solo para rol de ADMIN).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Nom_Cur:
 *                 type: string
 *               Des_Cur:
 *                 type: string
 *               Hor_Cont_Total:
 *                 type: integer
 *               Fech_Crea_Cur:
 *                 type: string
 *               Id_Cat_FK:
 *                 type: string
 *               Fot_Cur:
 *                 type: string
 *     responses:
 *       '105':
 *         description: El token del sesion del ususario ha expirado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *             example:
 *               type: success
 *               code: 105
 *               data: "Token expirado"
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
 *               data: {"result": {"type": "success","code": 200,"data": {"insertId": "2fquk73olt36rfar"}}}
 *       
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
RoutesCursos.post("/api/cursos/new",verifyToken, CreateCourse);
/**
 * @swagger
 * /api/cursos/update/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Cursos
 *     summary: Actualizar informacion de los cursos, el dato que se envia se actualiza, no es necesario enviarlos todos si no se requiere (Solo para rol de ADMIN).
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Id del curso a actualizar.
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
 *               Nom_Cur:
 *                 type: string
 *               Des_Cur:
 *                 type: string
 *               Hor_Cont_Total:
 *                 type: integer
 *               Fech_Crea_Cur:
 *                 type: string
 *               Id_Cat_FK:
 *                 type: string
 *               Fot_Cur:
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
 *               data: {"result": {"type": "success","code": 200,"data": {"affectedRows": 1}}}
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
RoutesCursos.put("/api/cursos/update/:id",verifyToken, UpdateCourse)

export default RoutesCursos;