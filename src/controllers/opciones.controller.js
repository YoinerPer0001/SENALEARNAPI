import { Opcione } from '../models/opciones.model.js'
import { adminPermissions } from '../utils/manage.permissions.js';
import jsonwebtoken from 'jsonwebtoken'
import 'dotenv/config'
import { response } from '../utils/responses.js';
const jwt = jsonwebtoken;



//get all options -- OK
export const GetAllOptions = async (req, res) => {

    try {

        jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {

            if (err) {
                response(res, 500, 105, "Something went wrong");

            } else {

                const { Id_Rol_FK } = data.user;

                const opciones = await Opcione.findAll();

                if (opciones) {
                    response(res, 200, 200, opciones);
                } else {
                    response(res, 404, 404, 'options not found');
                }

            }

        });

    } catch (error) {

        response(res, 500, 500, "something went wrong");
    }

}

//get  options by id -- OK
export const GetOptionsById = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {

        try {

            if (err) {
                response(res, 500, 105, "Something went wrong");

            } else {

                const { Id_Rol_FK } = data.user;

                const { id } = req.params;

                    //verify exist user
                    const option = await Opcione.findByPk(id)

                    if (option) {

                        response(res, 200, 200, option);

                    } else {

                        response(res, 404, 404, 'Options not found');

                    }
                
            }

        } catch (err) {

            response(res, 500, 500, "something went wrong");
        }
    })

}

// create options
export const createOptions = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {
        try {

            if (err) {
                response(res, 401, 401, "Token Error");
            } else {

                const { Id_Rol_FK } = data.user;
                const { nombre_opcion } = req.body;

                //verify user permissions
                const adminPermiso = adminPermissions(Id_Rol_FK);

                if (!adminPermiso) {

                    response(res, 403, 403, "you dont have permissions");
                } else {


                    if (!nombre_opcion) {

                        response(res, 400, 102, "Something went wrong");

                    } else {
                        const nombre_optLower = nombre_opcion.toLowerCase();

                        //verificamos que no exista la opcion
                        const option = await Opcione.findOne({ where: { nombre_opcion: nombre_optLower } });


                        if (option) {

                            response(res, 409, 409, "option is already registered");

                        } else {

                            const newOption = await Opcione.create({ nombre_opcion: nombre_optLower });

                            if (newOption) {
                                response(res, 200);
                            } else {
                                response(res, 500, 500, "error creating option");
                            }

                        }
                    }


                }

            }


        } catch (err) {

            response(res, 500, 500, "something went wrong");
        }


    })
}

//update options
export const UpdateOptions = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, dat) => {
        if (err) {

            response(res, 401, 401, "Token Error");
        } else {

            try {
                const { Id_Rol_FK } = dat.user;

                let adPermision = adminPermissions(Id_Rol_FK);

                if (adPermision) {

                    //Data
                    const { id } = req.params;
                    const { nombre_opcion } = req.body;

                    //verify exist option
                    const option = await Opcione.findByPk(id)

                    if (!option) {

                        response(res, 401, 401, "Option not found");

                    } else {
                        const objDatos = {
                            nombre_opcion: nombre_opcion.toLowerCase()
                        }

                        const responses = await Opcione.update(objDatos, { where: { id_opcion: id } })

                        if (responses) {
                            response(res, 200);
                        } else {
                            response(res, 500, 500, "Error updating option");
                        }
                    }

                } else {
                    response(res, 401, 401, "You don't have permissions");
                }

            } catch (err) {

                response(res, 500, 500, "something went wrong");

            }
        }



    })
}