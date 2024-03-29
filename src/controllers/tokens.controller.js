import { Token } from "../models/tokens.model.js";
import { response } from "../utils/responses.js";
import jsonwebtoken from 'jsonwebtoken'
import { InstPermissions, adminPermissions } from "../utils/manage.permissions.js";
import { Usuario } from "../models/users.model.js";
import 'dotenv/config.js'
import { where } from "sequelize";
const jwt = jsonwebtoken;

export const GetAllTokens = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {

        if (err) {
            response(res, 401, 401, "Something went wrong");
        } else {

            try {
                //verify permissions
                const { Id_Rol_FK } = data.user;

                let adPermision = adminPermissions(Id_Rol_FK);

                if (adPermision) {

                    const tokens = await Token.findAll();

                    if (tokens) {
                        response(res, 200, 200, tokens);
                    } else {
                        response(res, 404, 404, "Tokens not found");
                    }


                } else {
                    response(res, 403, 403, "you dont have permissions");
                }

            } catch (err) {

                response(res, 500, 500, "something went wrong");

            }
        }
    })

}

//get  TOKENS by user id
export const GetTokenssxUser = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {
        if (err) {
            response(res, 401, 401, "Something went wrong");
        } else {

            try {
                //verify permissions
                const { Id_Rol_FK } = data.user;
                let adPermision = adminPermissions(Id_Rol_FK);

                if (adPermision) {
                    const { id } = req.params;

                    if (id) {

                        //verify exist user
                        const user = await Usuario.findByPk(id)

                        if (!user) {

                            response(res, 404, 404, "user don't exist");

                        } else {

                            const tokens = await Token.findOne({ where: { User_Id_FK: id } });

                            if (tokens) {
                                response(res, 200, 200, tokens);
                            } else {
                                response(res, 404, 404, 'Tokens not found');
                            }
                        }


                    } else {
                        response(res, 400, 102, "Something went wrong");
                    }

                } else {
                    response(res, 403, 403, "you dont have permissions");
                }
            } catch (err) {
                response(res, 500, 500, "something went wrong");
            }


        }
    })

}

//get  TOKENS by type
export const GetTokenssxTipo = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {
        if (err) {
            response(res, 401, 401, "Token Error");
        } else {

            try {
                //verify permissions
                const { Id_Rol_FK } = data.user;
                let adPermision = adminPermissions(Id_Rol_FK);

                if (adPermision) {
                    const { tipo } = req.params;

                    const tokens = await Token.findOne({ where: { Tipo_token: tipo } });

                    if (tokens) {
                        response(res, 200, 200, tokens);
                    } else {
                        response(res, 404, 404, 'tokens not found');
                    }

                }



            } catch (err) {
                if (err.errno) {

                    response(res, 400, err.errno, err.code);

                } else {
                    response(res, 500, 500, "something went wrong");

                }
            }


        }
    })

}

// Insert Tokens
export const InsertToken = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {

        if (err) {
            response(res, 401, 401, "Token Error");
        }
        // verify permissions
        const { Id_Rol_FK } = data.user;
        let adPermision = adminPermissions(Id_Rol_FK);

        if (adPermision) {

            try {

                const { Tokens, Fec_Caducidad, Id_User, Tipo_token } = req.body;


                //verificamos que exista el usuario
                const UserExists = await Usuario.findByPk(Id_User)


                if (!UserExists) {

                    response(res, 401, 401, "User don't found");

                } else {

                    //create tokens
                    const datos = {
                        Token: Tokens,
                        Fec_Caducidad: Fec_Caducidad,
                        User_Id_FK: Id_User,
                        Tipo_token: Tipo_token
                    }

                    const newToken = await Token.create(datos);
                    if (newToken) {
                        response(res, 200);
                    } else {
                        response(res, 500, 500, 'Error creating token');
                    }


                }


            } catch (err) {

                response(res, 500, 500, "something went wrong");
            }

        } else {
            response(res, 403, 403, "you dont have permissions");
        }


    })
}

//update Tokens
export const UpdateTokens = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, dat) => {
        if (err) {

            response(res, 401, 401, "Token error");
        }

        try {
            const { Id_Rol_FK } = dat.user;

            let adPermision = adminPermissions(Id_Rol_FK);

            if (adPermision) {

                //Data
                const { id } = req.params;
                const datos = req.body;
                let datosEnv;

                //verify token exist
                let token = await Token.findByPk(id)

                if (!token) {
                    response(res, 401, 401, 'token not found');
                } else {

                    token = token.dataValues;

                    //user verify exist
                    if (datos.Id_User) {

                        const userExist = await Usuario.findByPk(datos.Id_User);
                        if (!userExist) {

                            response(res, 401, 401, "User don't found");

                        } else {

                            datosEnv = {
                                Token: datos.Tokens || token.Token,
                                User_Id_FK: datos.Id_User,
                                Fec_Caducidad: datos.Fec_Caducidad || token.Fec_Caducidad,
                                Tipo_token: datos.Tipo_token || token.Tipo_token
                            }

                           
                        }

                    } else {

                        datosEnv = {

                            Token: datos.Tokens || token.Token,
                            User_Id_FK: datos.Id_User || token.Id_User_FK,
                            Fec_Caducidad: datos.Fec_Caducidad || token.Fec_Caducidad,
                            Tipo_token: datos.Tipo_token || token.Tipo_token
                        }
                        const responses = await Token.update(datosEnv, { where: { Id_Token: id } })

                    }


                    const responses = await Token.update(datosEnv, { where: { Id_Token: id } })
               

                    if (responses) {
                        response(res, 200);
                    } else {
                        response(res, 500, 500, 'Error updating token');
                    }


                }

            } else {
                response(res, 401, 401, "You don't have permissions");
            }

        } catch (err) {

                response(res, 500, 500, err);
        }

    })
}