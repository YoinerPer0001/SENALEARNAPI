import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
import { adminPermissions } from "../managePermissions/manage.permissions.js"
import { mensajeEnviar } from "../mails/Emailmessages/verification.message.js";
import { mensaje_Confirm_Login } from "../mails/Emailmessages/login_verification.message.js";
import { response } from "../Resources/responses.js";
import { getAllUsers, UserByEmail, InsertUsers, GetUserbyId, UpdateEstEmail, getUserByEmailUser } from "../models/users.model.js";
import { GenCodigosTemp } from "../Resources/GenCodTemp.js";
import { InserTokens, VerEmailToken } from "../models/tokens.model.js";
import { InsertLocation, VerifyUserIp } from "../models/localizacion.model.js";

import 'dotenv/config'

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
                    const users = await getAllUsers(res);
                    response(res, 200, 200, users);

                } else {
                    response(res, 403, 403, "you dont have permissions");
                }

            }

        } catch (err) {
            if (err.errno) {

                response(res, 500, 500, "something went wrong");

            } else {

                response(res, 400, 104, "something went wrong");
            }
        }


    })






}

//register user ==== OK
export const regUser = async (req, res) => {


    try {

        const datos = req.body;

        //verificamos que los datos esten completos

        if (!datos.Nom_User || !datos.Ape_User || !datos.Ema_User || !datos.Pass_User || !datos.Dir_Ip) {

            if (err.errno) {

                response(res, 500, 500, "something went wrong");

            } else {

                response(res, 400, 104, "something went wrong");
            }
        } else {

            const passEncripted = await bcrypt.hash(datos.Pass_User, 10);


            //verificamos que no exista EMAIL/TEL
            const user = await UserByEmail(res, datos.Ema_User);


            if (user.length < 1) {

                // we encript password

                const DataEnv = {
                    Nom_User: datos.Nom_User,
                    Ape_User: datos.Ape_User,
                    Ema_User: datos.Ema_User,
                    passEncripted: passEncripted,
                    Id_Rol_FK: 1,
                }

                //insert data in database
                const DataInsert = await InsertUsers(res, DataEnv);


                //generamos un codigo que se guardara en la base de datos
                const { codigo, exp } = GenCodigosTemp(900);
                const DataToken = {
                    codigo: codigo,
                    exp: exp,
                    Id_User: DataInsert.insertId
                }
                //guardamos el token en la base de datos
                const token = await InserTokens(res, DataToken);

                //guardamos localizacion del usuario
                const objLoc = {
                    Dir_Ip: datos.Dir_Ip,
                    Id_User: DataInsert.insertId
                }

                const locate = await InsertLocation(res, objLoc);

                const IdInserted = {
                    InsertId: DataInsert.insertId
                }
                response(res, 200, 200, IdInserted);


                // envio de correo
                mensajeEnviar(datos.Ema_User, datos.Nom_User, codigo, datos.Pass_User);


            } else {
                response(res, 400, 107, "Email is registered");
            }


        }






    } catch (err) {

        if (err.errno) {

            response(res, 500, 500, "something went wrong");

        } else {

            response(res, 400, 104, "something went wrong");
        }
    }
}

//Validate Email ==== OK
export const ValidateEmail = async (req, res) => {

    try {
        const datos = req.body;

        if (!datos.Id_User || !datos.codigo) {
            if (err.errno) {

                response(res, 500, 500, "something went wrong");

            } else {

                response(res, 400, 104, "something went wrong");
            }
        } else {

            // verificamos que exista el usuario
            const user = await GetUserbyId(res, datos.Id_User)

            if (user.length > 0) {

                //verificamos que el codigo sea valido
                const token = await VerEmailToken(res, datos)

                if (token.length > 0) {

                    const fechaActual = Math.floor(Date.now() / 1000);
                    const fechaExp = token[0].Fec_Caducidad;

                    // verificamos que no este expirado el codigo
                    if (fechaActual > fechaExp) {
                        response(res, 400, 106, "Expired token");
                    } else {
                        // actualizamos el estado del Email a verificado
                        const updatedUser = await UpdateEstEmail(res, datos.Id_User)

                        if (updatedUser) {
                            response(res, 200, 200, updatedUser);
                        }

                    }

                } else {
                    response(res, 400, 105, "Something went wrong");
                }





            } else {

                response(res, 400, 103, "Something went wrong");
            }


        }





    } catch (err) {
        if (err.errno) {

            response(res, 500, 500, "something went wrong");

        } else {

            response(res, 400, 104, "something went wrong");
        }
    }
}



//login user
export const loginUser = async (req, res) => {

    try {

        const datosUser = req.body;
        //this allow login whith user or email
        let userEmail = "";
        let valueUserEmail = "";

        let errorDatosEnv = false;

        if (datosUser.Nom_User && datosUser.Pass_User && datosUser.Dir_Ip) {

            userEmail = 'Nom_User'
            valueUserEmail = datosUser.Nom_User;
        } else if (datosUser.Ema_User && datosUser.Pass_User && datosUser.Dir_Ip) {
            userEmail = 'Ema_User';
            valueUserEmail = datosUser.Ema_User;
        } else {
            errorDatosEnv = true;
        }

        // verificamos que exista el usuario
        if (errorDatosEnv) {

            if (err.errno) {

                response(res, 500, 500, "something went wrong");

            } else {

                response(res, 400, 104, "something went wrong");
            }

        } else {
            const user = await getUserByEmailUser(res, userEmail, valueUserEmail);

            if (user.length > 0) {
                //verificamos la password
                const passDecripted = await bcrypt.compare(datosUser.Pass_User, user[0].Pass_User);

                if (passDecripted) {// if password true

                    //verificamos la direccion ip se encuentre registrada previamente
                    const objLoc = {
                        Id_User: user[0].Id_User,
                        Dir_Ip: datosUser.Dir_Ip
                    }
                    const loc = await VerifyUserIp(res, objLoc)


                    //VERIFICAMOS IP

                    if (loc.length) {

                        // si existe generamos el token y lo guardamos en la db
                        const userData = {
                            Id_User: user[0].Id_User,
                            Ema_User: user[0].Ema_User,
                            Id_Rol_FK: user[0].Id_Rol_FK,
                        }

                        //generamos token y save on db
                        const datosToken = TokenDb(userData);

                        if (datosToken) {
                            // guardamos en Db
                            const resp = await InserTokens(res, datosToken, 1)
                            response(res, 200, 200, datosToken);

                        }



                    } else {

                        //enviamos codigo de verificacion para guardar la nueva ip
                        const { codigo, exp } = GenCodigosTemp(900);
                        //guardamos en la base de datos
                        const objTok = {
                            codigo: codigo,
                            exp: exp,
                            Id_User: user[0].Id_User
                        }

                        //guardamos el token en la db
                        const token = await InserTokens(res, objTok, 4)

                        if (token) {
                            mensaje_Confirm_Login(user[0].Ema_User, user[0].Nom_User, codigo);

                            response(res, 200, 108, "Verification code send success (update new ip)");
                        }

                    }

                } else {

                    response(res, 400, 103, "User or password incorrect");
                }

            } else {
                response(res, 400, 103, "User or password incorrect");
            }

        }

    } catch (err) {
        if (err.errno) {

            response(res, 500, 500, "something went wrong");

        } else {

            response(res, 400, 104, "something went wrong");
        }
    }


}


//validate cods Ip new
export const ValidateCod = async (req, res) => {

    try {

        const { Id_User, codigo, Dir_Ip } = req.body;

        // verificamos que exista el usuario
        const user = await GetUserbyId(res, Id_User)

        if (user.length > 0) {
            //verificamos que el token coincida
            const datos = {
                Id_User: Id_User,
                codigo: codigo,
                Dir_Ip: Dir_Ip
            }
            const token = await VerEmailToken(res, datos)

            if (token.length) {

                const fechaActual = Math.floor(Date.now() / 1000);
                const fechaExp = token[0].Fec_Caducidad;

                // verificamos que no este expirado el codigo
                if (fechaActual > fechaExp) {
                    response(res, 400, 106, "Expired token");
                } else {

                    // Insertar la nueva IP
                    const location = await InsertLocation(res, datos)

                    if (location) {
                        response(res, 200, 200, "location Success added");
                    }


                }

            } else {
                response(res, 400, 105, "Something went wrong");
            }



        } else {

            response(res, 400, 103, "Something went wrong");
        }




    } catch (err) {
        if (err.errno) {

            response(res, 500, 500, "something went wrong");

        } else {

            response(res, 400, 104, "something went wrong");
        }
    }
}


//funtions

// create token
function TokenDb(userData) {


    const token = jwt.sign({ user: userData }, process.env.SECRETWORD, { expiresIn: '4h' });
    const tokendecode = jwt.decode(token, process.env.SECRETWORD);
    const data1 = {
        codigo: token,
        exp: tokendecode.exp,
    }

    return data1;

}










