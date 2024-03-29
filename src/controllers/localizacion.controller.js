import { Localization } from '../models/localizacion.model.js'
import { adminPermissions } from '../utils/manage.permissions.js';
import jsonwebtoken from 'jsonwebtoken'
import 'dotenv/config'
import { response } from '../utils/responses.js';
import { Usuario } from '../models/users.model.js'
const jwt = jsonwebtoken;



//get all localizaciones
export const GetLocations = async (req, res) => {

    try {

        jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {
            if (err) {
                response(res, 401, 401, "Token Error");
            } else {

                const { Id_Rol_FK } = data.user;

                const adminPermiso = adminPermissions(Id_Rol_FK);

                if (adminPermiso) {
                    const locations = await Localization.findAll();

                    if (locations) {
                        response(res, 200, 200, locations);
                    } else {
                        response(res, 404, 404, 'locations not found');
                    }
                } else {
                    response(res, 401, 401, "You don't have permissions");
                }
            }

        });

    } catch (error) {
        response(res, 500, 500, "something went wrong");
    }

}

//get  locations by user id
export const GetLocationsxUser = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {
        if (err) {
            response(res, 401, 401, "Token Error");
        } else {

            try {
                const { id } = req.params;

                //verify exist user
                const user = await Usuario.findByPk(id)

                if (!user) {

                    response(res, 404, 404, "user don't exist");

                } else {

                    const locations = await Localization.findOne({ where: { Id_User_FK: id } });

                    if (locations) {
                        response(res, 200, 200, locations);
                    } else {
                        response(res, 404, 404, 'locations not found');
                    }
                }

            } catch (err) {

                response(res, 500, 500, "something went wrong");
            }
        }
    })

}

// create locations
export const createLocations = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {

        if (err) {
            response(res, 500, 105, "Something went wrong");
        } else {
            try {
                const { Id_Rol_FK } = data.user;

                //verify user permissions
                const adminPermiso = adminPermissions(Id_Rol_FK);

                const { Dir_Ip, Id_User } = req.body

                if (!adminPermiso) {

                    response(res, 403, 403, "you dont have permissions");
                } else {

                    //verificamos que exista el usuario
                    const UserExists = await Usuario.findByPk(Id_User)

                    if (!UserExists) {

                        response(res, 500, 103, "User don't exist");

                    } else {

                        //create location
                        const datos = {
                            Dir_Ip: Dir_Ip,
                            Id_User_FK: Id_User
                        }

                        const newLocation = await Localization.create(datos);
                        if (newLocation) {
                            response(res, 200);
                        } else {
                            response(res, 500, 500, "error creating location");
                        }

                    }
                }

            } catch (err) {

                response(res, 500, 500, "something went wrong");

            }
        }


    })
}

// //update locations
export const UpdateLocations = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, dat) => {
        if (err) {

            response(res, 400, 105, "Something went wrong");
        } else {

            try {
                const { Id_Rol_FK } = dat.user;

                let adPermision = adminPermissions(Id_Rol_FK);

                if (adPermision) {

                    //Data
                    const { id } = req.params;
                    const datos = req.body;

                    //verify exist location
                    let datosEnv;
                    let location = await Localization.findByPk(id)

                    if (!location) {

                        response(res, 404, 404, "location not found");

                    } else {
                        location = location.dataValues;

                        //user verify exist
                        if (datos.Id_User) {

                            const userExist = await Usuario.findByPk(datos.Id_User);

                            if (!userExist) {

                                response(res, 404, 404, "User don't exist");

                            } else {

                                datosEnv = {

                                    Dir_Ip: datos.Dir_Ip || location.Dir_Ip,
                                    Id_User_FK: datos.Id_User
                                }
                            }

                        } else {

                            datosEnv = {

                                Dir_Ip: datos.Dir_Ip || location.Dir_Ip,
                                Id_User_FK: datos.Id_User || location.Id_User_FK
                            }

                        }

                        const responses = await Localization.update(datosEnv, { where: { Id_Loc: id } })
                        if (responses) {
                            response(res, 200);
                        } else {
                            response(res, 500, 500, "error updating location");
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