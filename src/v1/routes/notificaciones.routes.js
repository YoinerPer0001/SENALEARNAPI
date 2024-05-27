import express from 'express';
import { GetNotifications, GetNotificationsxId, createNotification, UpdateNotification } from '../../controllers/notificaciones.controller.js';
import { verifyToken } from '../../middlewares/verifyToken.js';
import { AdminInstPermissions, InstPermissions, adminPermiso } from '../../middlewares/managePermissions.js';
import { createValidation, UpdateValidation } from '../../Validators/notificaciones.validator.js';
const routesNotificaciones = express();

routesNotificaciones.get('/api/v1/notifications',verifyToken, adminPermiso, GetNotifications);

routesNotificaciones.get('/api/v1/notifications/:id',verifyToken, GetNotificationsxId);

routesNotificaciones.post('/api/v1/notifications/create',createValidation,verifyToken, createNotification);

routesNotificaciones.put('/api/v1/notifications/update/:id',UpdateValidation,verifyToken, adminPermiso, UpdateNotification);







export default routesNotificaciones;