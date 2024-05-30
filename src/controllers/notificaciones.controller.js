import 'dotenv/config'
import uniqid from 'uniqid';
import { response } from "../utils/responses.js";
import { notificaciones } from '../models/notificaciones.model.js';
import { Cursos } from '../models/cursos.model.js';
import { DATE } from 'sequelize';
import { notificaciones_usuarios } from '../models/notificaciones_usuarios.model.js';


//get all notifications
export const GetNotifications = async (req, res) => {

    try {

        const notifications = await notificaciones.findAll({
            where: { ESTADO_REGISTRO: 1 },
            attributes: { exclude: ['updatedAt', 'createdAt'] }
        });

        if (notifications.length > 0) {
            response(res, 200, 200, notifications);
        } else {
            response(res, 404);
        }

    } catch (error) {

        response(res, 500, 500, error);
    }

}

//get  notification by id
export const GetNotificationsxId = async (req, res) => {

    try {
        const { id } = req.params;

        const notifications = await notificaciones.findByPk(id, {
             attributes: { exclude: ['updatedAt', 'createdAt'] }
            })

        if (notifications) {
            response(res, 200, 200, notifications);
        } else {
            response(res, 404);
        }

    } catch (err) {

        response(res, 500, 500, err);
    }

}

// create notification by user
export const createNotification = async (req, res) => {

    try {

        const Id_Not = uniqid();
        const Not_Fec_Cre = Date.now();

        const { Not_Tit, Not_Mens } = req.body;

        //create category
        const datos = {
            Id_Not: Id_Not,
            Not_Fec_Cre: Not_Fec_Cre,
            Not_Tit: Not_Tit.toLowerCase(),
            Not_Mens: Not_Mens.toLowerCase()
        }

        const created = await notificaciones.create(datos);
        if (created) {
<<<<<<< HEAD
            response(res,200, 200, {insertedId: Id_Not});
=======
            response(res, 200,200, {insertedId: Id_Not});
>>>>>>> 2363876d04011abce40b93f410123efd320c93c9
        } else {
            response(res, 500, 500, "error creating notification");
        }



    } catch (err) {

        response(res, 500, 500, "something went wrong");
    }

}

//update categorias
export const UpdateNotification = async (req, res) => {
    try {

        //Data
        const { id } = req.params;
        const data = req.body;

        //verify exist category

        let notificacion = await notificaciones.findByPk(id)
        
        if (!notificacion) {

            response(res, 404, 404, "notification not found");

        } else {
            notificacion = notificacion.dataValues;
       
            const datos = {
                Not_Fec_Cre: data.Not_Fec_Cre || notificacion.Not_Fec_Cre,
                Not_Tit: data.Not_Tit || notificacion.Not_Tit,
                Not_Mens: data.Not_Mens   || notificacion.Not_Mens
            }

            console.log(datos)

            const updated = await notificaciones.update(datos, { where: { Id_Not:  id } })
            if (updated) {
                response(res, 200);
            } else {
                response(res, 500, 500, "error updating notification");
            }

        }

    } catch (err) {
        response(res, 500, 500, err);
    }


}

export const deleteNot = async (req, res) => {
    try {

        const { id } = req.params

        const notification = await notificaciones.findByPk(id)
        if (notification) {
            //verify that notification dont have users asociated
            const users = await notificaciones_usuarios.findAll({ where: { Id_Not_FK: id } })
    
            if (users.length > 0) {
                response(res, 401, 401, "notification has users asociated");
            } else {
                const responses = await notificaciones.destroy({ where: { Id_Not: id } })
                if (responses) {
                    response(res, 200);
                } else {
                    response(res, 500, 500, "error deleting notification");
                }
            }

        } else {
            response(res, 404, 404, "Category not found");
        }

    } catch (err) {
        response(res, 500, 500, err);
    }
}

