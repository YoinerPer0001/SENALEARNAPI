import 'dotenv/config'
import uniqid from 'uniqid';
import { response } from "../utils/responses.js";
import { notificaciones_usuarios } from '../models/notificaciones_usuarios.model.js';
import { notificaciones } from '../models/notificaciones.model.js';
import { Usuario } from '../models/users.model.js';
import { Cursos } from '../models/cursos.model.js';
import { Inscripcione } from '../models/inscripciones.model.js';
import { sequelize } from '../database/db.js';

//asignar notificaciones por usuario

export const create = async (req, res) => {
    try {
        const Id_Not_Usu = uniqid();
        const { Id_Not, Id_User } = req.body;

        //verificamos que existan 
        let notificacion = await notificaciones.findByPk(Id_Not)
        let usuario = await Usuario.findByPk(Id_User)

        if (!notificacion || !usuario) {
            response(res, 404, 404, "Notificacion or User don't found")
        } else {
            const datos = {
                Id_Not_Usu,
                Id_Not_FK: Id_Not,
                Id_User_FK: Id_User,
                Fech_Notificacion: Date.now()
            }

            const created = await notificaciones_usuarios.create(datos)
            if (created) {
                response(res, 200, 200)
            } else {
                response(res, 500, 500, "Error creating assignment")
            }
        }

    } catch (err) {
        return response(res, 500, 500, err)
    }
}

export const createxCourse = async (req, res) => {

    try {

        const { Id_Not, Id_Cur } = req.body;

        //verificamos que existan 
        let notificacion = await notificaciones.findByPk(Id_Not)
        let curso = await Cursos.findByPk(Id_Cur)

        if (!notificacion || !curso) {
            response(res, 404, 404, "Notificacion or Course don't found")
        } else {



            //buscamos todos los estudiantes del curso
            const UserInsc = await Inscripcione.findAll({
                attributes: ['Id_User_FK'],
                where: { Id_Cur_FK: Id_Cur }
            })

            let PromisesList = [];

            UserInsc.map(usuario => {
                const Id_Not_Usu = uniqid();
                const added = notificaciones_usuarios.create({
                    Id_Not_Usu,
                    Id_Not_FK: Id_Not,
                    Id_User_FK: usuario.Id_User_FK,
                })

                PromisesList.push(added)

            })



            const responses = await Promise.all(PromisesList)

            if (responses.length > 0) {
                response(res, 200, 200)
            } else {
                response(res, 500, 500, "Error creating assignment")
            }

        }

    } catch (err) {
        return response(res, 500, 500, err)
    }
}

//enviar a todos los uusuarios
export const createAllUsers = async (req, res) => {
    try {
        const { Id_Not } = req.body;

        // Verificamos que la notificación exista
        let notificacion = await notificaciones.findByPk(Id_Not);
        console.log(notificacion);

        if (!notificacion) {
            return response(res, 404, 404, "Notification not found");
        }

        // Obtenemos el id de todos los usuarios
        const users = await Usuario.findAll({
            attributes: ['Id_User']
        });

        let promisesList = [];
        users.map(usuario => {
            const Id_Not_Usu = uniqid();
            const added = notificaciones_usuarios.create({
                Id_Not_Usu,
                Id_Not_FK: Id_Not,
                Id_User_FK: usuario.Id_User,
            });
            promisesList.push(added);
        });

        const responses = await Promise.all(promisesList);

        if (responses.length > 0) {
            return response(res, 200, "Assigned successfully");
        } else {
            return response(res, 500, "Error assigning");
        }
    } catch (err) {
        return response(res, 500, err);
    }
};

//actualizar estado de notificacion a leida
export const updateLecNot = async (req, res) => {
    try {
        const { id } = req.params;

        //verificamos que exista
        let notificacion = await notificaciones_usuarios.findByPk(id)
            console.log(notificacion)
        if (!notificacion) {
            response(res, 404, 404, "Notificacion not found")
        }else{
            notificacion = notificacion.dataValues;
            const updated = await notificaciones_usuarios.update({leida: true},{where: {Id_Not_Usu:id} })
            if (updated) {
                response(res, 200, 200)
            } else {
                response(res, 500, 500, "Error updating assignment")
            }
        }

    } catch (err) {
        return response(res, 500, err);
    }

}

//OBTENER NOTIFICACIONES DE UN USUARIO NO LEIDAS

export const getNotUser = async (req, res) => {
    try {
        const { id } = req.params;

        //verificamos que exista
        let usuario = await Usuario.findByPk(id)

        if (!usuario) {
            response(res, 404, 404, "User not found")
        } else {
            const notificacion = await notificaciones_usuarios.findAll({
                where: {Id_User_FK: id, leida: false},
                include:[
                    {
                        model: notificaciones,
                        attributes: {exclude:['Id_Not','createdAt', 'updatedAt']}
                    }
                ],
                attributes: {exclude:['createdAt', 'updatedAt']}
            })

            response(res, 200, 200, notificacion)
        }

    } catch (err) {
        return response(res, 500, err);
    }

}