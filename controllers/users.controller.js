import { connection } from "../db.js"
import jsonwebtoken from "jsonwebtoken";
import { config } from "dotenv";
import bcrypt from "bcrypt";
import { adminPermissions } from "../managePermissions/manage.permissions.js"
import { mensajeEnviar } from "../mails/Emailmessages/verification.message.js";
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

//login user
export const loginUser = async (req, res) => {

    try {

        const datosUser = req.body;

        //this allow login whith user or email
        let userEmail = "";
        let valueUserEmail = "";

        if (datosUser.Nom_User) {

            userEmail = 'Nom_User'
            valueUserEmail = datosUser.Nom_User;
        } else {
            userEmail = 'Ema_User';
            valueUserEmail = datosUser.Ema_User;
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

                    const userData = {
                        Id_User: results[0].Id_User,
                        Ema_User: results[0].Ema_User,
                        Id_Rol_FK: results[0].Id_Rol_FK,
                    }

                    //si existe generamos el token
                    const token = jwt.sign({ user: userData }, process.env.SECRETWORD, { expiresIn: '1h' });
                    const tokendecode = jwt.decode(token, process.env.SECRETWORD);
                    const data1 = {
                        sessionToken: token,
                        exp1: tokendecode.exp,
                    }

                    const tokenRefresco = jwt.sign({ user: userData }, process.env.SECRETWORDD, { expiresIn: '24h' })
                    const tokendecode2 = jwt.decode(tokenRefresco, process.env.SECRETWORD);
                    const data2 = {
                        refreshToken: tokenRefresco,
                        exp2: tokendecode2.exp,
                    }


                    res.status(200).json({
                        result: 200,
                        data1,
                        data2,
                    })

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

//Authorization: Bearer <token>
export const verifyToken = async (req, res, next) => {
    try {
        let bearerHeader = req.headers['authorization'];
        let token = req.params.id;

        console.log(token);

        if(token){

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

        }else if (typeof bearerHeader !== "undefined") {
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

//refresh token
export const refreshToken = async (req, res) => {

    //verificamos token

    jwt.verify(req.token, process.env.SECRETWORDD, (err, data) => {

        try {
            if (err) {
                return res.status(400).json({
                    result: 105,
                    err: err
                })
            }
            //verificamos que no este expirado
            if (Date.now() / 1000 > data.exp) {
                return res.status(400).json({
                    result: 106,
                    message: "Token expired"
                })

            }
            const newToken = jwt.sign({ user: data.user }, process.env.SECRETWORD, { expiresIn: '1h' });
            const decodetoken = jwt.decode(newToken, process.env.SECRETWORD);

            res.status(200).json({
                result: 200,
                SessionToken: newToken,
                exp: decodetoken.exp
            })
        } catch (error) {
            res.status(error).json({
                result: 105,
                error: "invalid token"
            })
        }
    })


}

//register user

export const regUser = async (req, res) => {


    try {

        const { Nom_User, Ape_User, Tel_User, Ema_User, Pass_User, Id_Rol_FK } = req.body;

        if (!Nom_User || !Ape_User || !Tel_User || !Ema_User || !Pass_User || !Id_Rol_FK) {

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



                connection.query("INSERT INTO usuarios (Nom_User,Ape_User,Tel_User,Ema_User,Pass_User,Id_Rol_FK) VALUES (?,?,?,?,?,?)", [Nom_User, Ape_User, Tel_User, Ema_User, passEncripted, Id_Rol_FK], (err, results, fields) => {
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
                        const tokenVerificacion = jwt.sign({ user: results.insertId }, process.env.SECRETWORD, { expiresIn: "15m" });
                        mensajeEnviar(Ema_User, Nom_User, tokenVerificacion, Pass_User);

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

//update user
export const UpdateUser = async (req, res) => {

    try {

        const datosUpd = req.body;
        const datosUser = jwt.decode(req.token, process.env.SECRETWORD);
        const { Id_User } = datosUser.user;

        //check email/tel dont exist
        if (datosUpd.Ema_User || datosUpd.Tel_User) {
            connection.query("SELECT * FROM usuarios WHERE Ema_User = ? OR Tel_User = ?", [datosUpd.Ema_User, datosUpd.Tel_User], async (err, results) => {
                if (err) {
                    return res.status(500).json({
                        result: 104,
                        err: err
                    })
                }
                if (results.length > 0) {
                    return res.status(400).json({
                        result: 107,
                    })
                } else {
                    //get info to update
                    connection.query("SELECT * FROM USUARIOS WHERE Id_User = ? ", [Id_User], async (err, results) => {
                        if (err) {
                            return res.status(500).json({
                                result: 104,
                                err: err
                            })
                        }

                        const oldUser = results[0];
                        let password = datosUpd.Pass_User;
                        //encript new pass
                        if (password) {
                            password = await bcrypt.hash(datosUpd.Pass_User, 10);
                        }

                        const newData = {
                            Nom_User: datosUpd.Nom_User || oldUser.Nom_User,
                            Ape_User: datosUpd.Ape_User || oldUser.Ape_User,
                            Tel_User: datosUpd.Tel_User || oldUser.Tel_User,
                            Ema_User: datosUpd.Ema_User || oldUser.Ema_User,
                            Pass_User: password || oldUser.Pass_User,
                        }

                        //update reg
                        connection.query("UPDATE usuarios SET Nom_User=?, Ape_User=?,Tel_User=?, Ema_User=?, Pass_User = ? WHERE Id_User = ?", [newData.Nom_User, newData.Ape_User, newData.Tel_User, newData.Ema_User, newData.Pass_User, oldUser.Id_User], (err, results) => {
                            if (err) {
                                return res.status(500).json({
                                    result: 104,
                                    err: err
                                })
                            } else {
                                return res.status(200).json({
                                    result: 200,
                                    data: results
                                })
                            }
                        })



                    })
                }
            })
        } else {
            //get info to update
            connection.query("SELECT * FROM USUARIOS WHERE Id_User = ? ", [Id_User], async (err, results) => {
                if (err) {
                    return res.status(500).json({
                        result: 104,
                        err: err
                    })
                }

                const oldUser = results[0];

                let password = datosUpd.Pass_User;
                //encript new pass
                if (password) {
                    password = await bcrypt.hash(datosUpd.Pass_User, 10);
                }

                const newData = {
                    Nom_User: datosUpd.Nom_User || oldUser.Nom_User,
                    Ape_User: datosUpd.Ape_User || oldUser.Ape_User,
                    Tel_User: datosUpd.Tel_User || oldUser.Tel_User,
                    Ema_User: datosUpd.Ema_User || oldUser.Ema_User,
                    Pass_User: password || oldUser.Pass_User,
                }

                //update reg
                connection.query("UPDATE usuarios SET Nom_User=?, Ape_User=?,Tel_User=?, Ema_User=?, Pass_User = ? WHERE Id_User = ?", [newData.Nom_User, newData.Ape_User, newData.Tel_User, newData.Ema_User, newData.Pass_User, oldUser.Id_User], (err, results) => {
                    if (err) {
                        return res.status(500).json({
                            result: 104,
                            err: err
                        })
                    } else {
                        return res.status(200).json({
                            result: 200,
                            data: results
                        })
                    }
                })



            })
        }


    } catch (error) {
        res.status(400).json({
            result: 102,
            message: "Something went wrong"
        })
    }

}

//Validate Email
export const ValidateEmail = async (req, res) => {

    try {
        const datosUser = jwt.decode(req.token, process.env.SECRETWORD);
        const { Id_User } = datosUser.user;

        connection.query("UPDATE usuarios SET Est_Email_User = ? WHERE Id_User = ?", [1, Id_User], (err, results) => {
            res.status(200).json({
                result: 200,
                data: results
            })
        });
    } catch (error) {
        res.status(400).json({
            result: 102,
            message: "Something went wrong"
        })
    }
}








