import jsonwebtoken from "jsonwebtoken"
import { adminPermissions } from "../managePermissions/manage.permissions.js";
import 'dotenv/config'
import uniqid from 'uniqid';
import { response } from "../Resources/responses.js";
import { getAllCat, GetCatxName, CreateCat, GetCatxId, UpdateCat, deleteCat } from "../models/categorias.model.js";

const jwt = jsonwebtoken;

//get all categories
export const GetCategories = async (req, res) => {

    try {

        getAllCat(res)
            .then(categories => {
                response(res, 200, 200, categories);
            })

    } catch (ex) {
        response(res, 400, 102, "Something went wrong");
    }

}

//get  category by id
export const GetCategoriesxId = async (req, res) => {

    try {
        const {id} = req.params;
        
        if (id) {
         
            GetCatxId(res, id)
                .then(categories => {
                    response(res, 200, 200, categories);
                })

        } else {
            response(res, 400, 102, "Something went wrong");
        }



    } catch (ex) {
        response(res, 400, 102, "Something went wrong");
    }

}

// create categories
export const createCategories = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, (err, data) => {

        if (err) {
            response(res, 500, 105, "Something went wrong");
        }

        try {

            const Id_Cat = uniqid();

            const { Nom_Cat } = req.body;

            //verificamos que no exista una categoria con el mismo nombre
            GetCatxName(res, Nom_Cat)
                .then(category => {

                    if (category.length > 0) {

                        response(res, 500, 107, "category already exist");

                    } else {

                        const userData = jwt.decode(req.token, process.env.SECRETWORD);

                        //verify user permissions
                        const adminPermiso = adminPermissions(userData.user.Id_Rol_FK);

                        if (!adminPermiso) {

                            response(res, 403, 403, "you dont have permissions");
                        } else {

                            //create category
                            const datos = {
                                Id_Cat: Id_Cat,
                                Nom_Cat: Nom_Cat.toLowerCase()
                            }

                            CreateCat(res, datos)
                                .then(responses => {

                                    if (responses) {
                                        response(res, 200, 200, "success created");
                                    }
                                })
                        }



                    }
                })



        } catch (err) {

            response(res, 400, 102, "Something went wrong");

        }


    })
}

//update categorias
export const UpdateCategories = async (req, res) => {

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
                const { Nom_Cat } = req.body;

                //verify exist category

                GetCatxId(res, id)
                    .then(category => {
                        if (category.length < 1) {

                            response(res, 500, 103, "Something went wrong");

                        } else {

                            const datos = {
                                id: id,
                                Nom_Cat: Nom_Cat
                            }

                            UpdateCat(res, datos)
                                .then(responses => {
                                    response(res, 200, 200, responses);
                                })
                        }
                    })





            } else {
                response(res, 401, 401, "You don't have permissions");
            }

        } catch (ex) {
            response(res, 400, 102, "Something went wrong");
        }



    })
}

//delete categories
export const DeleteCategories = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, (err, datos) => {
        if (err) {

            response(res, 400, 105, "Something went wrong");
        }

        try {

            const { id } = req.params;
            const { Id_Rol_FK } = datos.user;

            const permiso = adminPermissions(Id_Rol_FK);

            if (!permiso) {
                response(res, 401, 401, "You don't have permissions");
            }

            //verify category exist

            GetCatxId(res, id)
                .then(category => {
                  
                    if (category.length > 0) {

                        deleteCat(res,id)
                            .then(responses => {
                                if (responses) {
                                    response(res, 200, 200, responses);
                                }
                            })

                    }else{
                        response(res, 200, 204, category);
                    }
                })


        } catch (ex) {

            response(res, 400, 102, "something went wrong");

        }

    })
}
