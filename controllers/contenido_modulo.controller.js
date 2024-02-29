import jsonwebtoken from "jsonwebtoken"
import { adminPermissions, InstPermissions } from "../managePermissions/manage.permissions.js";
import 'dotenv/config'
import uniqid from 'uniqid';
import { response } from "../Resources/responses.js";
import { GetContModxIdMod, createModules } from "../models/contenido_modulo.model.js";
import { getModulexId } from '../models/modulos_cursos.model.js'

const jwt = jsonwebtoken;


//get module content by id module
export const GetContModuloxModule = async (req, res) => {

    try {
        const { id } = req.params;

        if (id) {

            const modules = await GetContModxIdMod(id)

            if (modules.lenght > 0) {
                response(res, 200, 200, modules);

            } else {
                response(res, 200, 204, modules);
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

// create cont module
export const createCategories = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {

        if (err) {
            response(res, 500, 105, "Something went wrong");
        }

        try {

            const Id_Cont = uniqid();

            const { Tip_Cont, Url_Cont, Tit_Cont, Id_Mod_FK } = req.body;

            const { Id_Rol_FK } = data.user;
            //verify user permissions
            const adminPermiso = adminPermissions(Id_Rol_FK);
            const InstPermiso = InstPermissions(Id_Rol_FK);

            //verify exist module course

            const moduleCourseExist = await getModulexId(Id_Mod_FK);
          
            if (moduleCourseExist.length > 0) {
              
                if (!adminPermiso && !InstPermiso) {

                    response(res, 403, 403, "you dont have permissions");
                } else {

                    //create category
                    const datos = {
                        Id_Cont: Id_Cont,
                        Tip_Cont: Tip_Cont,
                        Url_Cont: Url_Cont,
                        Tit_Cont: Tit_Cont,
                        Id_Mod_FK: Id_Mod_FK
                    }

                    const newModule = await createModules(datos);
                    const objResp = {
                        insertId: Id_Cont
                    }

                    response(res, 200, 200, objResp);


                }

                
            }else{
                response(res, 400, 103, "module don't exist");
            }





        } catch (err) {

            if (err.errno) {

                response(res, 400, err.errno, err.code);

            } else {
                response(res, 500, 500, "something went wrong");

            }


        }


    })
}

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

