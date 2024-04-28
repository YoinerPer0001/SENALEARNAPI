import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
import { adminPermissions } from "../utils/manage.permissions.js"
import { mensajeEnviar } from "../utils/Emailmessages/verification.message.js";
import { mensaje_Confirm_Login } from "../utils/Emailmessages/login_verification.message.js";
import { response } from "../utils/responses.js";
import { GenCodigosTemp } from "../utils/GenCodTemp.js";
import cookieParser from "cookie-parser";
import { serialize } from "cookie";
import uniqid from 'uniqid';
import 'dotenv/config'

import { Token } from "../models/tokens.model.js";
import { Localization } from "../models/localizacion.model.js";
import { Usuario } from "../models/users.model.js";



const jwt = jsonwebtoken;

// get all users
export const getUsers = async (req, res) => {
    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {

        try {

            if (err) {
                response(res, 500, 105, "Something went wrong");

            } else {

                //we check permissions
                const permissions = adminPermissions(data.user.Id_Rol_FK);

                if (permissions) {

                    //mostramos datos de usuarios
                    const users = await Usuario.findAll({ attributes: { exclude: ['Pass_User'] } });
                    if (users) {
                        response(res, 200, 200, users);
                    } else {
                        response(res, 401, 401, "Users not found");
                    }


                } else {
                    response(res, 403, 403, "you dont have permissions");
                }

            }

        } catch (err) {

            response(res, 500, 500, "something went wrong");
        }


    })






}

// get user by id
export const getUserxId = async (req, res) => {
    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {
        try {
            if (err) {
                response(res, 500, 105, "Invalid Token");

            } else {
                const { id } = req.params;

                const users = await Usuario.findByPk(id, { attributes: { exclude: ['Pass_User'] } });

                if (users) {
                    response(res, 200, 200, users);
                } else {
                    response(res, 401, 401, "User not found");
                }


            }

        } catch (err) {
            response(res, 500, 500, "something went wrong");
        }
    })

}

//register user ==== OK
export const regUser = async (req, res) => {
    try {

        const datos = req.body;

        //verificamos que los datos esten completos

        const passEncripted = await bcrypt.hash(datos.Pass_User, 10);

        //verificamos que no exista EMAIL/TEL
        const user = await Usuario.findOne({ where: { Ema_User: datos.Ema_User } });

        if (!user) {

            // we encript password
            const Id_User = uniqid();

            const DataEnv = {
                Id_User: Id_User,
                Nom_User: datos.Nom_User,
                Ape_User: datos.Ape_User,
                Ema_User: datos.Ema_User,
                Pass_User: passEncripted,
                Id_Rol_FK: 1,
            }

            //insert data in database
            const DataInsert = await Usuario.create(DataEnv);

            //generamos un codigo que se guardara en la base de datos
            const { codigo, exp } = GenCodigosTemp(600);

            const DataToken = {
                Token: codigo,
                Fec_Caducidad: exp,
                User_Id_FK: Id_User,
                Tipo_token: 2
            }

            //guardamos el token en la base de datos
            const token = await Token.create(DataToken);

            //guardamos localizacion del usuario
            const objLoc = {
                Dir_Ip: datos.Dir_Ip,
                Id_User_FK: Id_User
            }

            const locate = await Localization.create(objLoc);

            response(res, 200);


            // envio de correo
            mensajeEnviar(datos.Ema_User, datos.Nom_User, codigo, datos.Pass_User);

        } else {
            response(res, 400, 107, "Email is registered");
        }

    } catch (err) {
        response(res, 500, 500, "something went wrong");
    }
}

//UPDATE USERS data (only rol users)
export const UpdateUserData = async (req, res) => {
    jwt.verify(req.token, process.env.SECRETWORD, async (err, jwtdata) => {

        try {
            const UserData = req.body;
            const {id} = req.params;

            //get actual data
            let actualData = await Usuario.findByPk(id);
            actualData = actualData.dataValues;

            let objUpdate = {

                Nom_User: UserData.Nom_User || actualData.Nom_User,
                Ape_User: UserData.Ape_User || actualData.Ape_User,
                Tel_User: UserData.Tel_User || actualData.Tel_User,
                Pass_User: actualData.Pass_User,
                Ema_User: UserData.Ema_User || actualData.Ema_User,
                Fot_User: UserData.Fot_User || actualData.Tel_User
            }

            if (UserData.Pass_User) {
                objUpdate.Pass_User = await bcrypt.hash(UserData.Pass_User, 10)
            }
           

            //update data
            const updatedData = await Usuario.update(objUpdate, { where: { Id_User: Id_User } });

            if (updatedData) {
                response(res, 200)
            } else {
                response(res, 500, 500, "Error updating user data");
            }

        } catch (err) {

            response(res, 500, 500, err);
        }

    })
}

//Validate Email ==== OK
export const ValidateEmail = async (req, res) => {

    try {
        const datos = req.body;

        // verificamos que exista el usuario
        const user = await Usuario.findByPk(datos.Id_User)

        if (user) {

            //verificamos que el codigo sea valido
            let token = await Token.findOne({ where: { User_Id_FK: datos.Id_User, Token: datos.codigo, Tipo_token: 2 } })

            if (token) {

                token = token.dataValues;

                const fechaActual = Math.floor(Date.now() / 1000);
                const fechaExp = token.Fec_Caducidad;

                // verificamos que no este expirado el codigo
                if (fechaActual > fechaExp) {
                    response(res, 401, 401, "Expired token");
                } else {
                    // actualizamos el estado del Email a verificado
                    const updatedUser = await Usuario.update({ Est_Email_User: 1 }, { where: { Id_User: datos.Id_User } })

                    if (updatedUser) {
                        response(res, 200);
                    } else {
                        response(res, 500, 500, "Error updating email state");
                    }

                }

            } else {
                response(res, 401, 401, "Something went wrong");
            }

        } else {

            response(res, 401, 401, "Token not found");
        }

    } catch (err) {

        response(res, 500, 500, err);
    }
}

//login user
export const loginUser = async (req, res) => {

    try {

        const datosUser = req.body;
        //this allow login whith user or email

        let user = await Usuario.findOne({ where: { Ema_User: datosUser.Ema_User } })
        user = user.dataValues;

        const passDecripted = await bcrypt.compare(datosUser.Pass_User, user.Pass_User);

        if (passDecripted) {// if password true

            //verificamos la direccion ip se encuentre registrada previamente
            const objLoc = {
                Id_User_FK: user.Id_User,
                Dir_Ip: datosUser.Dir_Ip
            }

            const loc = await Localization.findOne({ where: objLoc })
          
            //VERIFICAMOS IP

            if (loc) {

                // si existe generamos el token y lo guardamos en la db
                const userData = {
                    Id_User: user.Id_User,
                    Nom_User: user.Nom_User,
                    Ape_User: user.Ape_User,
                    Ema_User: user.Ema_User,
                    Id_Rol_FK: user.Id_Rol_FK,
                }

                //generamos token y save on db
                const datosToken = TokenDb(userData);

                if (datosToken) {

                    const tokendecode = jwt.decode(datosToken, process.env.SECRETWORD);
                    const data1 = {
                        User_Id_FK: userData.Id_User,
                        Token: datosToken,
                        Fec_Caducidad: tokendecode.exp,
                        Tipo_token: 1
                    }

                    // guardamos en Db
                    const resp = await Token.create(data1)

                    // const cookieP = cookieParser();


                    // //serializar
                    // const serialized = serialize('sessionToken', datosToken, {
                    //     httpOnly: true,
                    //     secure: true,
                    //     sameSite: 'none',
                    //     maxAge: 86400000,
                    //     path: '/'
                    // })


                    // res.setHeader('Set-Cookie', serialized)

                    response(res, 200, 200, datosToken);


                }



            } else {

                //enviamos codigo de verificacion para guardar la nueva ip
                const { codigo, exp } = GenCodigosTemp(600);
                //guardamos en la base de datos
                const objTok = {
                    Token: codigo,
                    Fec_Caducidad: exp,
                    User_Id_FK: user.Id_User,
                    Tipo_token: 4
                }

                //guardamos el token en la db
                const token = await Token.create(objTok)

                if (token) {
                    mensaje_Confirm_Login(user.Ema_User, user.Nom_User, codigo);

                    response(res, 200, 108, "Verification code send success (update new ip)");
                }

            }

        } else {
            response(res, 401, 401, "User or password incorrect");
        }

    } catch (err) {
        response(res, 500, 500, err);
    }


}

//validate cods Ip new
export const ValidateCod = async (req, res) => {

    try {

        const { Id_User, codigo, Dir_Ip } = req.body;

        // verificamos que exista el usuario
        const user = await Usuario.findByPk(Id_User)

        if (user) {
            //verificamos que el token coincida

            const token = await Token.findOne({ where: { User_Id_FK: Id_User, Token: codigo, Tipo_token: 4 } })

            if (token) {

                const fechaActual = Math.floor(Date.now() / 1000);
                const fechaExp = token.Fec_Caducidad;

                // verificamos que no este expirado el codigo
                if (fechaActual > fechaExp) {
                    response(res, 400, 106, "Expired token");
                } else {

                    const datos = {
                        Id_User_FK: Id_User,
                        Dir_Ip: Dir_Ip
                    }

                    // Insertar la nueva IP
                    const location = await Localization.create(datos)
                    if (location) {
                        response(res, 200);
                    } else {
                        response(res, 500, 103, "Error updating ip state");
                    }

                }

            } else {
                response(res, 404, 404, "Not found");
            }

        } else {

            response(res, 400, 103, "Something went wrong");
        }




    } catch (err) {

        response(res, 500, 500, "something went wrong");

    }
}

//funtions

// create token
function TokenDb(userData) {


    const token = jwt.sign({ user: userData }, process.env.SECRETWORD, { expiresIn: '24h' });
    // const tokendecode = jwt.decode(token, process.env.SECRETWORD);
    // const data1 = {
    //     Id_User:userData.Id_User,
    //     codigo: token,
    //     exp: tokendecode.exp,
    // }

    return token;

}










