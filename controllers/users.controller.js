import { connection } from "../db.js"
import jsonwebtoken from "jsonwebtoken";
import { config } from "dotenv";
import bcrypt from "bcrypt";
import { adminPermissions } from "../managePermissions/manage.permissions.js"
import { mensajeEnviar } from "../mails/Emailmessages/verification.message.js";
import { mensaje_Confirm_Login } from "../mails/Emailmessages/login_verification.message.js";
import { v4 as uuidv4 } from "uuid";

const dotenv = config();
const jwt = jsonwebtoken;

export const getUsers = async (req, res) => {


    jwt.verify(req.token, process.env.SECRETWORD, (err, data) => {

        try {


            if (err) {
                return res.status(400).json({
                    result: 105,
                    err: err
                });

            } else {

                //we check permissions
                const permissions = adminPermissions(data.user.Id_Rol_FK, res);

                if (permissions) {

                    connection.query('SELECT * FROM usuarios', (err, results, fields) => {
                        if (err) {
                            return res.status(500).json({
                                result: 104,
                                err: err
                            })

                        } else {

                            res.status(200).json({
                                result: 200,
                                data: results
                            })
                        }

                    })

                } else {

                    res.status(403).json({
                        result: 403,
                        message: "you dont have permissions"
                    });
                }

            }






        } catch (error) {
            res.status(400).json({
                result: 102,
                message: "Something went wrong"
            });
        }


    })






}

//register user ==== OK
export const regUser = async (req, res) => {


    try {


        const { Nom_User, Ape_User, Tel_User, Ema_User, Pass_User, Id_Rol_FK, Dir_Ip } = req.body;

        //verificamos que los datos esten completos

        if (!Nom_User || !Ape_User || !Tel_User || !Ema_User || !Pass_User || !Id_Rol_FK || !Dir_Ip) {

            return res.status(400).json({
                result: 102,
                error: "something went wrong"
            })
        }

        //verificamos que no exista EMAIL/TEL
        connection.query("SELECT * FROM usuarios WHERE Ema_User = ? OR Tel_User = ?", [Ema_User, Tel_User], async (err, results) => {
            if (err) {
                return res.status(500).json({
                    result: 104,
                    err: err
                })
            }
            if (results.length < 1) {

                // we encript password
                const passEncripted = await bcrypt.hash(Pass_User, 10);

                connection.query("INSERT INTO usuarios (Nom_User,Ape_User,Tel_User,Ema_User,Pass_User,Id_Rol_FK, Est_Email_User) VALUES (?,?,?,?,?,?,?)", [Nom_User, Ape_User, Tel_User, Ema_User, passEncripted, Id_Rol_FK, 0], (err, results, fields) => {
                    if (err) {
                        return res.status(500).json({
                            result: 104,
                            err: err
                        })
                    } else {

                        //generamos un codigo que se guardara en la base de datos

                        const { codigo, exp } = GenCodigosTemp(900);
                        //const codigo = uuidv4();
                        //const tiempoExp = Math.floor((Date.now() / 1000) + 900000); //15mins

                        connection.query("INSERT INTO tokens (Token,Fec_Caducidad, User_Id_FK, Tipo_token) VALUES (?,?,?,?)", [codigo, exp, results.insertId, 2], (err, resul) => {
                            if (err) {
                                return res.status(500).json({
                                    result: 104,
                                    err: err
                                })
                            } else {

                                //guardamos los datos de localizacion del usuario
                                connection.query("INSERT INTO localizacion (Dir_Ip,Id_User_FK) VALUES (?,?)", [Dir_Ip, results.insertId], (err, resul) => {
                                    if (err) {
                                        return res.status(500).json({
                                            result: 104,
                                            err: err
                                        })
                                    }
                                    else {
                                        res.status(200).json({
                                            result: 200,
                                            data: results
                                        })

                                        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
                                        // envio de correo
                                        mensajeEnviar(Ema_User, Nom_User, codigo, Pass_User);
                                    }
                                });
                            }
                        });



                    }

                })
            } else {
                res.status(400).json({
                    result: 107,
                    err: "Email or phone is registered"
                })
            }
        })



    } catch (error) {

        res.status(400).json({
            result: 102,
            message: "Something went wrong"
        })
    }
}

//Validate Email ==== OK
export const ValidateEmail = async (req, res) => {

    try {
        const { Id_User, codigo } = req.body;

        // verificamos que exista el usuario
        connection.query("SELECT * FROM USUARIOS WHERE Id_User = ?", [Id_User], (err, results) => {
            if (err) {
                return res.status(400).json({
                    result: 105,
                    err: err
                });

            }

            if (results.length > 0) {

                connection.query("SELECT * FROM tokens WHERE User_Id_FK = ? AND Token = ?", [Id_User, codigo], (err, resu) => {
                    if (err) {
                        return res.status(400).json({
                            result: 104,
                            err: err
                        });
                    }
                    if (resu.length > 0) {

                        const fechaActual = Math.floor(Date.now() / 1000);
                        const fechaExp = resu[0].Fec_Caducidad;

                        // verificamos que no este expirado el codigo
                        if (fechaActual > fechaExp) {
                            return res.status(400).json({
                                result: 106,
                                message: "Expired token"
                            })
                        } else {
                            // actualizamos el estado del Email a verificado
                            connection.query("UPDATE usuarios SET Est_Email_User = ? WHERE Id_User = ?", [1, Id_User], (err, results) => {
                                if (err) {
                                    return res.status(400).json({
                                        result: 104,
                                        err: err
                                    });
                                } else {
                                    return res.status(200).json({
                                        result: 200,
                                        data: results
                                    });
                                }
                            });
                        }

                    } else {
                        return res.status(400).json({
                            result: 105
                        });
                    }
                })


            } else {

                res.status(400).json({
                    result: 103,
                    message: "Something went wrong"
                })
            }
        })


    } catch (error) {
        res.status(400).json({
            result: 102,
            message: "Something went wrong"
        })
    }
}

//Authorization: Bearer <token>
export const verifyToken = async (req, res, next) => {
    try {
        let bearerHeader = req.headers['authorization'];
        let token = req.params.id;

        if (token) {

            const bearerToken = token;

            const decodetoken = jwt.decode(bearerToken, { complete: true })

            const fechaActual = Math.floor(Date.now() / 1000);

            if (fechaActual > decodetoken.payload.exp) {
                return res.status(400).json({
                    message: "Expired token"
                })
            }

            req.token = bearerToken;
            next();

        } else if (typeof bearerHeader !== "undefined") {
            const bearerToken = bearerHeader.split(' ')[1];


            const decodetoken = jwt.decode(bearerToken, { complete: true })

            const fechaActual = Math.floor(Date.now() / 1000);

            if (fechaActual > decodetoken.payload.exp) {
                return res.status(400).json({
                    message: "Expired token"
                })
            }

            req.token = bearerToken;
            next();

        } else {
            res.status(400).json({
                result: 101,
                error: "invalid token"
            });
        }
    } catch (error) {
        res.status(400).json({
            result: 101,
            error: "invalid token",
            errorMessage: error
        })
    }
}

//login user
export const loginUser = async (req, res) => {

    try {

        const datosUser = req.body;
        //this allow login whith user or email
        let userEmail = "";
        let valueUserEmail = "";



        if (datosUser.Nom_User && datosUser.Pass_User && datosUser.Dir_Ip) {

            userEmail = 'Nom_User'
            valueUserEmail = datosUser.Nom_User;
        } else if (datosUser.Ema_User && datosUser.Pass_User && datosUser.Dir_Ip) {
            userEmail = 'Ema_User';
            valueUserEmail = datosUser.Ema_User;
        } else {
            return res.status(400).json({
                result: 102,
                message: "something went wrong"
            })
        }

        // verificamos que exista el usuario
        connection.query(`SELECT * FROM usuarios WHERE ${userEmail} = ?`, [valueUserEmail], async (err, results, fields) => {
            if (err) {
                return res.status(500).json({
                    result: 104
                });
            }

            if (results[0]) {

                const passDecripted = await bcrypt.compare(datosUser.Pass_User, results[0].Pass_User);
                //verificamos la password
                if (passDecripted) {// if password true

                    //verificamos la direccion ip se encuentre registrada previamente
                    connection.query("SELECT * FROM localizacion WHERE Id_User_FK = ? AND Dir_Ip = ? ", [results[0].Id_User, datosUser.Dir_Ip], (err, resul) => {
                        if (err) {
                            return res.status(500).json({
                                result: 104
                            });

                        } else {

                            //VERIFICAMOS IP

                            if (resul.length > 0) {

                                // si existe generamos el token y lo guardamos en la db
                                const userData = {
                                    Id_User: results[0].Id_User,
                                    Ema_User: results[0].Ema_User,
                                    Id_Rol_FK: results[0].Id_Rol_FK,
                                }

                                //generamos token y save on db
                                const datosToken = TokenDb(userData, 1, res);

                                return res.status(200).json({
                                    result: 200,
                                    datosToken
                                })
                            } else {

                                //enviamos codigo de verificacion para guardar la nueva ip
                                const { codigo, exp } = GenCodigosTemp(900);
                                //guardamos en la base de datos
                                let guardo = 0;
                                connection.query("INSERT INTO tokens (Token,Fec_Caducidad,User_Id_FK,Tipo_token) VALUES (?,?,?,?)", [codigo, exp, results[0].Id_User, 4], (err, resp) => {
                                    if (err) {
                                        return res.status(400).json({
                                            result: 104,
                                            message: "Something went wrong"
                                        })
                                    } else {

                                        mensaje_Confirm_Login(results[0].Ema_User, results[0].Nom_User, codigo);
                                        return res.status(200).json({
                                            result: 108
                                        })

                                    }
                                })
                            }


                        }

                    });

                } else {
                    res.status(400).json({
                        result: 103,
                        message: "User or password incorrect"
                    })
                }



            } else {
                res.status(400).json({
                    result: 103,
                    message: "User or password incorrect"
                })
            }

        })
    } catch (error) {
        res.status(400).json({
            result: 102,
            message: "Something went wrong"
        })
    }


}


//validate cods Ip new
export const ValidateCod = async (req, res) => {

    try {
        const { Id_User, codigo, Dir_Ip } = req.body;

        // verificamos que exista el usuario
        connection.query("SELECT * FROM USUARIOS WHERE Id_User = ?", [Id_User], (err, results) => {
            if (err) {
                return res.status(400).json({
                    result: 105,
                    err: err
                });

            }

            if (results.length > 0) {

                connection.query("SELECT * FROM tokens WHERE User_Id_FK = ? AND Token = ?", [Id_User, codigo], (err, resu) => {
                    if (err) {
                        return res.status(400).json({
                            result: 104,
                            err: err
                        });
                    }
                    if (resu.length > 0) {

                        const fechaActual = Math.floor(Date.now() / 1000);
                        const fechaExp = resu[0].Fec_Caducidad;

                        // verificamos que no este expirado el codigo
                        if (fechaActual > fechaExp) {
                            return res.status(400).json({
                                result: 106,
                                message: "Expired token"
                            })
                        } else {

                            // Insertar la nueva IP 
                            connection.query("INSERT INTO localizacion (Dir_Ip, Id_User_FK) VALUES (?,?)", [Dir_Ip, results[0].Id_User], (err, results) => {
                                if (err) {
                                    return res.status(400).json({
                                        result: 104,
                                        err: err
                                    });
                                } else {
                                    return res.status(200).json({
                                        result: 200,
                                        data: results
                                    });
                                }
                            });
                        }

                    } else {
                        return res.status(400).json({
                            result: 105
                        });
                    }
                })


            } else {

                res.status(400).json({
                    result: 103,
                    message: "Something went wrong"
                })
            }
        })


    } catch (error) {
        res.status(400).json({
            result: 102,
            message: "Something went wrong"
        })
    }
}


//funtions

function GenCodigosTemp(tiempo) {
    const codigo = uuidv4();
    const exp = Math.floor((Date.now() / 1000) + tiempo);
    const data = {
        codigo: codigo,
        exp: exp
    }
    return data
}

// create token and save en db
function TokenDb(userData, tipo, res) {


    const token = jwt.sign({ user: userData }, process.env.SECRETWORD, { expiresIn: '4h' });
    const tokendecode = jwt.decode(token, process.env.SECRETWORD);
    const data1 = {
        sessionToken: token,
        exp1: tokendecode.exp,
    }

    // guardamos en Db
    connection.query("INSERT INTO tokens (Token,Fec_Caducidad,User_Id_FK,Tipo_token) VALUES (?,?,?,?)", [token, tokendecode.exp, userData.Id_User, tipo], (err, results) => {
        if (err) {
            res.status(400).json({
                result: 104,
                message: "Something went wrong"
            })
        }
    })

    return data1;

}










