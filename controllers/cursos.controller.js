import { connection } from "../db.js"
import { InstPermissions, adminPermissions } from "../managePermissions/manage.permissions.js"
import uniqid from 'uniqid';
import jsonwebtoken from 'jsonwebtoken';
import 'dotenv/config'
import { query } from "express";

const jwt = jsonwebtoken;

// get all courses published
export const getCursos = async (req, res) => {

    try {

        //lista de cursos publicados
        connection.query('SELECT * FROM cursos WHERE Est_Cur = ?', [2], (err, results, fields) => {
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
        /**/

    } catch (error) {
        res.status(400).json({
            result: 102,
            message: "Something went wrong"
        });
    }


}

// get all courses by category
export const getCuCat = async (req, res) => {

    try {


        const categoria = req.params.id;
        connection.query("SELECT * FROM CURSOS WHERE Id_Cat_FK = ? AND Est_Cur = ?", [categoria, 1], (err, result) => {
            if (err) {
                return res.status(500).json({
                    result: 104,
                    err: err
                })
            } else {
                res.status(200).json({
                    result: 200,
                    data: result
                })
            }

        });



    } catch (error) {

        res.status(400).json({
            result: 102,
            message: "Something went wrong"
        })
    }

}

//CREATE A NEW COURSE
export const CreateCourse = async (req, res) => {

    try {

        jwt.verify(req.token, process.env.SECRETWORD, (err, dat) => {
            if (err) {
                return res.status(400).json({
                    result: 105,
                    err: err
                });

            }

            const { Id_User, Nom_Cur, Des_Cur, Hor_Cont_Total, Fech_Crea_Cur, Id_Cat_FK, Fot_Cur } = req.body;

            //verify complete data

            if (!Id_User || !Nom_Cur || !Des_Cur || !Hor_Cont_Total || !Fech_Crea_Cur || !Id_Cat_FK || !Fot_Cur) {
                return res.status(400).json({
                    result: 102,
                    message: "Datos incompletos o incorrectos"
                })
            } else {

                let Id_Cur = uniqid();

                //verify user exist and rol

                connection.query("SELECT * from usuarios WHERE Id_User = ? ", [Id_User], (err, result) => {

                    if (err) {
                        return res.status(500).json({
                            result: 500,
                            message: "something went wrong"
                        })

                    } else if (result.length < 1) {

                        return res.status(204).json({
                            result: 204,
                            message: "user isn't registered"
                        })
                    }


                    //verify permissions
                    const permisoInst = InstPermissions(result[0].Id_Rol_FK);
                    const permisoAdmin = adminPermissions(result[0].Id_Rol_FK);

                    if (permisoInst || permisoAdmin) {

                        const Est_Cur = 1;
                        connection.query("INSERT INTO cursos (Id_Cur, Nom_Cur,Des_Cur,Hor_Cont_Total, Fech_Crea_Cur,Id_Cat_FK, Est_Cur, Fot_Cur) VALUES (?,?,?,?,?,?,?,?)", [Id_Cur, Nom_Cur, Des_Cur, Hor_Cont_Total, Fech_Crea_Cur, Id_Cat_FK, Est_Cur, Fot_Cur], (err, result) => {

                            if (err) {
                                return res.status(500).json({
                                    result: 500,
                                    message: "something went wrong",

                                })
                            }

                            return res.status(200).json({
                                result: 200,
                                insertId: Id_Cur
                            })


                        })

                    } else {
                        res.status(401).json({
                            result: 401,
                            message: "You don't have permissions"
                        })
                    }

                })


            }


        });


    } catch (ex) {

        res.status(400).json({
            result: 102,
            message: "Something went wrong"
        })
    }
}

//UPDATE COURSE
export const UpdateCourse = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, dat) => {
        if (err) {
            return res.status(400).json({
                result: 105,
                err: err
            });
        }

        let {user} = jwt.decode(req.token, process.env.SECRETWORD);
       
        let adPermision = adminPermissions( user.Id_Rol_FK);
        let InsPermission = InstPermissions( user.Id_Rol_FK);
        

        if (adPermision || InsPermission) {

            //Data
            try {

                const { id } = req.params;
                const InfoCur = req.body;

                //verify exist user

                let objDatos;

                const curso = verifyExistCurso(id)
                    .then(curso => {

                        objDatos = {
                            Nom_Cur: InfoCur.Nom_Cur || curso.Nom_Cur,
                            Des_Cur: InfoCur.Des_Cur || curso.Des_Cur,
                            Hor_Cont_Total: InfoCur.Hor_Cont_Total || curso.Hor_Cont_Total,
                            Fech_Crea_Cur: InfoCur.Fech_Crea_Cur || curso.Fech_Crea_Cur,
                            Id_Cat_FK: InfoCur.Id_Cat_FK || curso.Id_Cat_FK,
                            Fot_Cur: InfoCur.Fot_Cur || curso.Fot_Cur
                        }

                        connection.query("UPDATE cursos SET Nom_Cur= ? , Des_Cur = ?, Hor_Cont_Total = ?, Fech_Crea_Cur = ? , Id_Cat_FK = ? , Fot_Cur = ? WHERE Id_Cur = ?",
                            [objDatos.Nom_Cur, objDatos.Des_Cur, objDatos.Hor_Cont_Total, objDatos.Fech_Crea_Cur, objDatos.Id_Cat_FK, objDatos.Fot_Cur, id], (err, result) => {
                                if (err) {
                                    return res.status(500).json({
                                        result: 500,
                                        message: "something went wrong",

                                    })
                                } else {

                                    return res.status(200).json({
                                        result: 200,
                                        message: result
                                    })
                                }

                            });
                    })

            } catch (ex) {
                res.status(400).json({
                    result: 102,
                    message: "Something went wrong",
                    error: ex
                })
            }
        }else{
            res.status(401).json({
                result: 401,
                message: "You don't have permissions"
            })
        }



    })
}

const verifyExistCurso = (id) => {

    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM cursos WHERE Id_Cur = ?", [id], (err, result) => {
            if (err) {
                reject({
                    result: 500,
                    message: "something went wrong"
                })

            } else if (result.length < 1) {

                reject({
                    result: 204,
                    message: "user isn't registered"
                })

            } else {

                resolve(result[0]);
            }
        })
    })

}