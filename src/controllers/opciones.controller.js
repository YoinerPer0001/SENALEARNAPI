import { getAllOpciones, getOptionById, GetOpcionxName, InsertOption, updateOption } from '../models/opciones.model.js'
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

                const adminPermiso = adminPermissions(Id_Rol_FK);

                if (adminPermiso) {
                    const opciones = await getAllOpciones();

                    if (opciones.length > 0) {
                        response(res, 200, 200, opciones);
                    } else {
                        response(res, 204, 204, opciones);
                    }
                } else {
                    response(res, 401, 401, "You don't have permissions");
                }
            }

        });

    } catch (error) {

        if (err.errno) {

            response(res, 400, err.errno, err.code);

        } else {
            response(res, 500, 500, "something went wrong");

        }
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

                const adminPermiso = adminPermissions(Id_Rol_FK);

                if (!adminPermiso) {
                    response(res, 403, 403, "you don't have permissions");
                } else {

                    if (id) {

                        //verify exist user
                        const option = await getOptionById(id)

                        if (option.length < 1) {

                            response(res, 204, 204, option);

                        } else {

                            response(res, 200, 200, option);

                        }


                    } else {
                        response(res, 400, 102, "Something went wrong");
                    }
                }
            }



        } catch (err) {
            if (err.errno) {

                response(res, 400, err.errno, err.code);

            } else {
                response(res, 500, 500, "something went wrong");

            }
        }
    })

}

// create options
export const createOptions = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {
        try {

            if (err) {
                response(res, 500, 105, "Something went wrong");
            } else {

                const { Id_Rol_FK } = data.user;
                const { nombre_opcion } = req.body;
                
                const nombre_optLower= nombre_opcion.toLowerCase();
                console.log(nombre_optLower)
                //verify user permissions
                const adminPermiso = adminPermissions(Id_Rol_FK);

                if (!adminPermiso) {

                    response(res, 403, 403, "you dont have permissions");
                } else {

                    if (!nombre_opcion) {

                        response(res, 400, 102, "Something went wrong");

                    } else {

                        //verificamos que no exista la opcion
                        const option = await GetOpcionxName(nombre_optLower);


                        if (option.length > 0) {

                            response(res, 500, 103, "option is already registered");

                        } else {

                            const newOption = await InsertOption(nombre_optLower);
                            const objResp = {
                                insertId: newOption.insertId
                            }
                            response(res, 200, 200, objResp);

                        }
                    }


                }

            }




        } catch (err) {

            if (err.errno) {

                response(res, 400, err.errno, err.code);

            } else {
                response(res, 500, 500, "something went wrong");

            }


        }


    })
}

//update options
export const UpdateOptions = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, dat) => {
        if (err) {

            response(res, 400, 105, "Something went wrong");
        }

        try {
            const { Id_Rol_FK } = dat.user;

            let adPermision = adminPermissions(Id_Rol_FK);

            if (adPermision) {

                //Data
                const { id } = req.params;
                const { nombre_opcion } = req.body;

                if (!nombre_opcion) {
                    response(res, 400, 102, "Something went wrong");

                } else {

                }
                //verify exist option
                const option = await getOptionById(id)

                if (option.length < 1) {

                    response(res, 500, 103, "Something went wrong");

                } else {
                    const objDatos ={
                        id_opcion: id,
                        nombre_opcion: nombre_opcion.toLowerCase()
                    }

                    const responses = await updateOption(objDatos)
                    const objRes = {
                        affectedRows: responses.affectedRows
                    }
                    response(res, 200, 200, objRes);




                }

            } else {
                response(res, 401, 401, "You don't have permissions");
            }

        } catch (err) {

            if (err.errno) {

                response(res, 400, err.errno, err.code);

            } else {
                response(res, 500, 500, "something went wrong");

            }
        }



    })
}