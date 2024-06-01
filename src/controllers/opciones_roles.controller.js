import { Roles_Opcione } from '../models/opciones_roles.model.js'
import { response } from '../utils/responses.js'
import { adminPermissions } from '../utils/manage.permissions.js'
import jsonwebtoken from 'jsonwebtoken'
import { Role } from '../models/roles.model.js'
import 'dotenv/config.js'
import { Opcione } from '../models/opciones.model.js'

const jwt = jsonwebtoken

//Asignar opciones a roles
export const AsigOptRol = async (req, res) => {

    try {

        const { Id_Rol, Id_Opcion } = req.body;

        //verify exist rol

        const rol = await Role.findByPk(Id_Rol)

        if (!rol) {

            response(res, 404, 404, "rol don't exist");

        } else {

            //verify exist option
            const option = await Opcione.findByPk(Id_Opcion)

            if (!option) {

                response(res, 404, 404, "option don't exist");

            } else {

                //verify asignation don't exit
                const asignation = await Roles_Opcione.findOne({ where: { Id_Rol_fk: Id_Rol, id_opcion_fk: Id_Opcion } })

                if (asignation) {

                    response(res, 409, 409, "option is already assigned");

                } else {

                    const newAsignation = await Roles_Opcione.create({
                        Id_Rol_fk: Id_Rol,
                        id_opcion_fk: Id_Opcion
                    })
                    if (newAsignation) {
                        response(res, 200)
                    } else {
                        response(res, 500, 500, "error creating option");
                    }

                }

            }
        }

    } catch (err) {
        response(res, 500, 500, "Something went wrong");
    }

}

//obtener opciones de roles
export const getAllOptionsxRol = async (req, res) => {

    try {

        const { id } = req.params;

        //verify rol exist
        const rol = await Role.findByPk(id)

        if (!rol) {
            response(res, 400, 103, "rol don't exist");
        } else {

            const options = await Roles_Opcione.findAll(
                { where: { Id_Rol_FK: id, ESTADO_REGISTRO:1 } ,
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include:[
                    {
                        model: Opcione,
                        as: 'Opcion',
                        attributes: { exclude: ['createdAt', 'updatedAt'] },
                    }
                ]
            })

            response(res, 200, 200, options)

        }

    } catch (err) {
        response(res, 500, err);
    }
}

//editar opciones asignadas a los roles
export const updateOptionsRoles = async (req, res) => {

    try {
        const { id } = req.params;
        const { Id_Opcion, New_Opcion } = req.body;

        //verificar que existe la asignacion
        const asignation = await Roles_Opcione.findOne({ where: { Id_Rol_fk: id, id_opcion_fk: Id_Opcion } })


        if (asignation) {

            //verificar que existe la nueva opcion
            const newOption = await Opcione.findByPk(New_Opcion)

            if (newOption) {

                //verificar que no existe la posible nueva asignacion
                const Newasignation = await Roles_Opcione.findOne({ where: { Id_Rol_fk: id, id_opcion_fk: New_Opcion } })

                if (Newasignation) {
                    response(res, 403, 403, "option is already assigned");
                } else {
                    //actualizamos
                    const updatedAsignation = await Roles_Opcione.update({ id_opcion_fk: New_Opcion }, { where: { Id_Rol_fk: id, id_opcion_fk: Id_Opcion } })
                    if (updatedAsignation) {
                        response(res, 200)
                    } else {
                        response(res, 500, 500, "error assigning option");
                    }

                }

            } else {
                response(res, 401, 401, "option don't exist");
            }

        } else {

            response(res, 401, 401, "option is not assigned to this role");
        }

    } catch (err) {
        response(res, 500, 105, "Something went wrong");
    }

}


export const deleteOptRol = async (req, res) => {
    try{

        const {option, rol} = req.params

        const asignacion = await Roles_Opcione.findOne({where: {Id_Rol_fk: rol, id_opcion_fk: option}})
        if(asignacion){
    
            const responses = await Roles_Opcione.update({ESTADO_REGISTRO: 0},{where:{Id_Rol_fk: rol, id_opcion_fk: option}})
            if(responses){
                response(res, 200);
            }else{
                response(res, 500, 500, "error deleting assignation");
            }

        }else{
            response(res, 404, 404, "assignation not found");
        }

    }catch (err) {
        response(res, 500, 500, err);
    }
}
