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

        const categorias = await getAllCat();

        response(res, 200, 200, categorias);


    } catch (error) {

        if (error.errno) {

            response(res, 500, 500, "something went wrong");

        } else {

            response(res, 400, 104, "something went wrong");
        }
    }

}

//get  category by id
export const GetCategoriesxId = async (req, res) => {

    try {
        const { id } = req.params;

        if (id) {

            const categoria = await GetCatxId(res, id)

            response(res, 200, 200, categoria);

        } else {
            response(res, 400, 102, "Something went wrong");
        }



    } catch (err) {
        if (err.errno) {

            response(res, 500, 500, "something went wrong");

        } else {

            response(res, 400, 104, "something went wrong");
        }
    }

}

// create categories
export const createCategories = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {

        if (err) {
            response(res, 500, 105, "Something went wrong");
        }

        try {

            const Id_Cat = uniqid();

            const { Nom_Cat } = req.body;

            //verificamos que no exista una categoria con el mismo nombre
            const categoriaExists = await GetCatxName(res, Nom_Cat)


            if (categoriaExists.length > 0) {

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

                    const newCategory = await CreateCat(res, datos);

                    response(res, 200, 200, "success created");


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

                const category = await GetCatxId(res, id)

                if (category.length < 1) {

                    response(res, 500, 103, "Something went wrong");

                } else {

                    const datos = {
                        id: id,
                        Nom_Cat: Nom_Cat
                    }

                    const responses = await UpdateCat(res, datos)

                    response(res, 200, 200, responses);

                }






            } else {
                response(res, 401, 401, "You don't have permissions");
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

//delete categories
export const DeleteCategories = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, datos) => {
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

            const category = await GetCatxId(res, id)

            if (category.length > 0) {

                const responses = await deleteCat(res, id)

                if (responses) {
                    response(res, 200, 200, "Success deleted");
                }


            } else {
                response(res, 200, 204, category);
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
