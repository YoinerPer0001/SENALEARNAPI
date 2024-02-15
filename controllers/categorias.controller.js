import { connection } from "../db.js"
import jsonwebtoken from "jsonwebtoken"
import { adminPermissions } from "../managePermissions/manage.permissions.js";
import 'dotenv/config'
import { query } from "express";
import uniqid from 'uniqid';

const jwt = jsonwebtoken;

//get all categories
export const GetCategories = async (req, res) => {

    try {

        connection.query("SELECT * FROM categorias", (err, result) => {
            if (err) {
                return res.status(500).json({
                    result: 104,
                    message: "Something went wrong"

                })
            }

            res.status(200).json({
                result: 200,
                data: result
            })
        });


    } catch (ex) {
        res.status(400).json({
            result: 102,
            message: "Something went wrong"
        });
    }

}

// create categories
export const createCategories = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, (err, data) => {

        if (err) {

            return res.status(500).json({
                result: 104,
                message: "Something went wrong",
                error: err
            })

        }

        try {

            const Id_Cat = uniqid();

            const { Nom_Cat } = req.body;

            //verificamos que no exista una categoria con el mismo nombre
            connection.query("SELECT * FROM categorias WHERE Nom_Cat = ?", [Nom_Cat], (err, result) => {

                if (err) {

                    return res.status(500).json({
                        result: 104,
                        message: "Something went wrong",
                        errors: err

                    })

                }

                if (result.length > 0) {

                    return res.status(500).json({
                        result: 107,
                        message: "category already exist"
                    })

                } else {

                    const userData = jwt.decode(req.token, process.env.SECRETWORD);

                    //verify user permissions
                    const adminPermiso = adminPermissions(userData.user.Id_Rol_FK);

                    if (!adminPermiso) {
                        return res.status(403).json({
                            result: 403,
                            message: "you dont have permissions"
                        });
                    }

                    //create category
                    connection.query("INSERT INTO categorias (Id_Cat, Nom_Cat) VALUES (?,?)", [Id_Cat, Nom_Cat.toLowerCase()], (err, results) => {

                        if (err) {

                            return res.status(500).json({
                                result: 104,
                                message: "Something went wrong",
                                errors: err

                            })

                        } else {

                            res.status(200).json({
                                result: 200,
                                message: "success created"
                            })
                        }

                    })

                }


            });


        } catch (err) {

            res.status(400).json({
                result: 102,
                message: "Something went wrong",
                ERR: err
            });
        }


    })
}

//update categorias
export const UpdateCategories = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, dat) => {
        if (err) {
            return res.status(400).json({
                result: 105,
                err: err
            });
        }

        let {user} = jwt.decode(req.token, process.env.SECRETWORD);
       
        let adPermision = adminPermissions( user.Id_Rol_FK);
        

        if (adPermision) {

            //Data
            try {

                const { id } = req.params;
                const {Nom_Cat} = req.body;

                //verify exist category

                let objDatos;

                connection.query("SELECT * FROM categorias WHERE Id_Cat = ?", [id], (err, result) => {

                    if(err){
                        return res.status(500).json({
                            result: 500,
                            message: "something went wrong",

                        })
                    }else{

                        connection.query("UPDATE categorias SET Nom_Cat= ? WHERE Id_Cat = ?",
                            [Nom_Cat, id], (err, result) => {
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
                    }
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
