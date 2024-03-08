import { AsignOptionRol, getAsignation, getoptionsxRol,updateOptionRol } from '../models/opciones_roles.model.js'
import { response } from '../Resources/responses.js'
import { adminPermissions } from '../managePermissions/manage.permissions.js'
import jsonwebtoken from 'jsonwebtoken'
import { getRolById } from '../models/roles.model.js'
import 'dotenv/config.js'
import { getOptionById } from '../models/opciones.model.js'

const jwt = jsonwebtoken

//Asignar opciones a roles
export const AsigOptRol = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {

        try {
            if (err) {
                response(res, 500, 105, "Something went wrong");
            } else {

                //verify permissions
                const { Id_Rol_FK } = data.user;
                let adPermision = adminPermissions(Id_Rol_FK);

                if (adPermision) {

                    const { Id_Rol, Id_Opcion } = req.body;

                    if (!Id_Rol || !Id_Opcion) {

                        response(res, 400, 103, "Id_Rol and Id_Opcion are required");

                    } else {

                        //verify exist rol

                        const rol = await getRolById(Id_Rol)

                        if (rol.length < 1) {

                            response(res, 400, 103, "rol don't exist");

                        } else {

                            //verify exist option
                            const option = await getOptionById(Id_Opcion)

                            if (option.length < 1) {

                                response(res, 500, 103, "option don't exist");

                            } else {

                                //verify asignation don't exit
                                const asignation = await getAsignation(Id_Rol, Id_Opcion)

                                if (asignation.length > 0) {

                                    response(res, 500, 103, "option is already assigned");

                                } else {

                                    const newAsignation = await AsignOptionRol(Id_Rol, Id_Opcion)
                                    const objres={
                                        affectedRows: newAsignation.affectedRows
                                    }
                                    response(res, 200, 200, objres)
                                }

                            }
                        }
                    }

                } else {
                    response(res, 403, 403, "you don't have permissions");
                }
            }

        } catch (err) {
            if (err.errno) {
                response(res, 500, err.errno, err.code);
            } else {
                response(res, 500, 105, "Something went wrong");
            }

        }


    });
}
//obtener opciones de roles
export const getAllOptionsxRol = async (req, res) => {

    try {
        jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {

            if (err) {
                response(res, 500, 105, "Something went wrong");
            } else {

                const { Id_Rol_FK } = data.user;

                //verify rol exist
                const rol = await getRolById(Id_Rol_FK)

                if (rol.length < 1) {
                    response(res, 400, 103, "rol don't exist");
                } else {

                    const options = await getoptionsxRol(Id_Rol_FK)

                    response(res, 200, 200, options)

                }
            }
        })

    } catch (err) {

        if (err.errno) {
            response(res, 500, err.errno, err.code);
        } else {
            response(res, 500, 105, "Something went wrong");
        }
    }
}

//editar opciones asignadas a los roles
export const updateOptionsRoles = (req, res) => {
    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {
        try {
            if (err) {
                response(res, 500, 105, "Something went wrong");

            } else {
                const { Id_Rol_FK } = data.user;
                let adPermision = adminPermissions(Id_Rol_FK);

                if (adPermision) {
                    const {id} = req.params;
                    const { Id_Opcion, New_Opcion } = req.body;

                    //verificar que existe la asignacion
                    const asignation = await getAsignation(id, Id_Opcion)
                    if (asignation.length > 0) {

                        //verificar que existe la nueva opcion
                        const newOption = await getOptionById(New_Opcion)
                        if (newOption.length > 0) {

                            //verificar que no existe la posible nueva asignacion
                            const Newasignation = await getAsignation(id, New_Opcion)
                            if (Newasignation.length > 0) {
                                response(res, 500, 103, "option is already assigned");
                            }else{
                                //actualizamos
                                const updatedAsignation = await updateOptionRol(New_Opcion, Id_Opcion, id)
                                const objres={
                                    affectedRows: updatedAsignation.affectedRows
                                }
                                response(res, 200, 200, objres)
                            }
                            
                        }else{
                            response(res, 500, 103, "option don't exist");
                        }
                        
                    }else{

                        response(res, 500, 103, "option is not assigned to this role");
                    }


                }else{
                    response(res, 403, 403, "you don't have permissions");
                }

            }

        }catch (err) {
            if (err.errno) {
                response(res, 500, err.errno, err.code);
            } else {
                response(res, 500, 105, "Something went wrong");
            }
        }
    })
}