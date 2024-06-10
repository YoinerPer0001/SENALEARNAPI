import express from 'express'
import { verifyToken } from "../../middlewares/verifyToken.js";
import { createxCourse, create, createAllUsers, updateLecNot, getNotUser, deleteNotUser } from '../../controllers/notificaciones_usuarios.controller.js';
import { createxCourseValidation, createxUserValidation, createxAllUsers } from '../../Validators/notificaciones_usuarios.validator.js';
import { adminPermiso, AdminInstPermissions } from "../../middlewares/managePermissions.js";


const routesNotUsu = express();


routesNotUsu.get('/api/v1/notifications/user/:id', verifyToken, getNotUser)

routesNotUsu.post('/api/v1/notifications/user',createxUserValidation, verifyToken, AdminInstPermissions, create )

routesNotUsu.post('/api/v1/notifications/course',createxCourseValidation, verifyToken, AdminInstPermissions, createxCourse)

routesNotUsu.post('/api/v1/notifications/all',createxAllUsers, verifyToken, adminPermiso, createAllUsers)

routesNotUsu.put('/api/v1/notifications/user/update/:id', verifyToken, updateLecNot)

routesNotUsu.delete('/api/v1/notifications/user/delete/:id', verifyToken, deleteNotUser)
export default routesNotUsu;