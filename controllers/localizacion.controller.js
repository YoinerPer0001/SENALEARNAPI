import { getAllLoc ,getAllLocUsers} from '../models/localizacion.model.js'
import { adminPermissions } from '../managePermissions/manage.permissions.js';
import jsonwebtoken from 'jsonwebtoken'
import 'dotenv/config'
import { response } from '../Resources/responses.js';
import {GetUserbyId} from '../models/users.model.js'
const jwt = jsonwebtoken;



//get all localizaciones
export const GetLocations = async (req, res) => {

    try {

        jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {

            const { Id_Rol_FK } = data.user;

            const adminPermiso = adminPermissions(Id_Rol_FK);

            if (adminPermiso) {
                const locations = await getAllLoc();

                if (locations.length > 0) {
                    response(res, 200, 200, locations);
                } else {
                    response(res, 204, 204, locations);
                }
            } else {
                response(res, 401, 401, "You don't have permissions");
            }

        });

    } catch (error) {

        if (err.errno) {

            response(res, 400, err.errno, err.code);

        } else {
            response(res, 500, 500, "something went wrong");

        }
    }

}

//get  locations by user id
export const GetLocationsxUser = async (req, res) => {

    try {
        const { id } = req.params;

        if (id) {

            //verify exist user
            const user = await GetUserbyId(id)

            if(user.length < 1){

                response(res, 400, 103, "user don't exist");

            }else{

                const locations = await getAllLocUsers(id);

                if (locations.length > 0) {
                    response(res, 200, 200, locations);
                } else {
                    response(res, 204, 204, locations);
                }
            }
            

        } else {
            response(res, 400, 102, "Something went wrong");
        }



    } catch (err) {
        if (err.errno) {

            response(res, 400, err.errno, err.code);

        } else {
            response(res, 500, 500, "something went wrong");

        }
    }

}

// // create categories
// export const createCategories = async (req, res) => {

//     jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {

//         if (err) {
//             response(res, 500, 105, "Something went wrong");
//         }

//         try {

//             const Id_Cat = uniqid();

//             const { Nom_Cat } = req.body;

//             if (!Nom_Cat) {

//                 response(res, 400, 102, "Something went wrong");

//             } else {

//                 //verificamos que no exista una categoria con el mismo nombre
//                 const categoriaExists = await GetCatxName(Nom_Cat)


//                 if (categoriaExists.length > 0) {

//                     response(res, 500, 107, "category already exist");

//                 } else {

//                     const userData = jwt.decode(req.token, process.env.SECRETWORD);

//                     //verify user permissions
//                     const adminPermiso = adminPermissions(userData.user.Id_Rol_FK);

//                     if (!adminPermiso) {

//                         response(res, 403, 403, "you dont have permissions");
//                     } else {

//                         //create category
//                         const datos = {
//                             Id_Cat: Id_Cat,
//                             Nom_Cat: Nom_Cat.toLowerCase()
//                         }

//                         const newCategory = await CreateCat(datos);
//                         const objResp = {
//                             insertId: Id_Cat
//                         }
//                         response(res, 200, 200, objResp);


//                     }



//                 }
//             }

//         } catch (err) {

//             if (err.errno) {

//                 response(res, 400, err.errno, err.code);

//             } else {
//                 response(res, 500, 500, "something went wrong");

//             }


//         }


//     })
// }

// //update categorias
// export const UpdateCategories = async (req, res) => {

//     jwt.verify(req.token, process.env.SECRETWORD, async (err, dat) => {
//         if (err) {
//             response(res, 400, 105, "Something went wrong");
//         }

//         try {
//             const { Id_Rol_FK } = dat.user;

//             let adPermision = adminPermissions(Id_Rol_FK);


//             if (adPermision) {

//                 //Data


//                 const { id } = req.params;
//                 const { Nom_Cat } = req.body;

//                 //verify exist category

//                 const category = await GetCatxId(id)

//                 if (category.length < 1) {

//                     response(res, 500, 103, "Something went wrong");

//                 } else {

//                     const datos = {
//                         id: id,
//                         Nom_Cat: Nom_Cat
//                     }

//                     const responses = await UpdateCat(datos)
//                     const objRes = {
//                         affectedRows: responses.affectedRows
//                     }
//                     response(res, 200, 200, objRes);

//                 }






//             } else {
//                 response(res, 401, 401, "You don't have permissions");
//             }

//         } catch (err) {

//             if (err.errno) {

//                 response(res, 400, err.errno, err.code);

//             } else {
//                 response(res, 500, 500, "something went wrong");

//             }
//         }



//     })
// }