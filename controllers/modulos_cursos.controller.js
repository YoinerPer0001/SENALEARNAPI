import jsonwebtoken from "jsonwebtoken"
import { adminPermissions, InstPermissions } from "../managePermissions/manage.permissions.js";
import 'dotenv/config'
import uniqid from 'uniqid';
import { response } from "../Resources/responses.js";
import { getModulexCourse , createModule} from "../models/modulos_cursos.model.js";
import { verifyExistCurso } from "../models/cursos.model.js";

const jwt = jsonwebtoken;

//get  modules by course's id -- OK
export const GetModulesxId = async (req, res) => {

    try {
        const { id } = req.params;

        const module = await getModulexCourse(id)

        response(res, 200, 200, module);

    } catch (err) {
        if (err.errno) {

            response(res, 400, err.errno, err.code);

        } else {
            response(res, 500, 500, "something went wrong");

        }
    }

}

// create new modules
export const createModules = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {

        if (err) {
            response(res, 500, 105, "Something went wrong");
        }

        try {

            const Id_Mod = uniqid();

            const { Tit_Mod, Est_Mod, Id_Cur, Horas_Cont_Mod } = req.body;
            
            //verificamos que no exista una categoria con el mismo nombre
            const courseExists = await verifyExistCurso(Id_Cur)
         

            if (courseExists.length < 1) {

                response(res, 500, 103, "course don't exist");

            } else {

                const { Id_Rol_FK } = data.user;

                //verify user permissions
                const adminPermiso = adminPermissions(Id_Rol_FK);
                const InstrucPermissions = InstPermissions(Id_Rol_FK);

                if (adminPermiso || InstrucPermissions) {
                    //create category
                    const datos = {
                        Id_Mod : Id_Mod,
                        Tit_Mod : Tit_Mod,
                        Est_Mod : Est_Mod,
                        Id_Cur_FK : Id_Cur,
                        Horas_Cont_Mod: Horas_Cont_Mod
                    }

                    const newModule = await createModule(datos);
                    const objResp = {
                        insertId: Id_Mod
                    }
                    response(res, 200, 200, objResp);

                } else {

                    response(res, 403, 403, "you dont have permissions");

                }

            }

        } catch (err) {
            console.log(err)
            if (err.errno) {

                response(res, 400, err.errno, err.code);

            } else {
                response(res, 500, 500, "something went wrong");

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

                const category = await GetCatxId(id)

                if (category.length < 1) {

                    response(res, 500, 103, "Something went wrong");

                } else {

                    const datos = {
                        id: id,
                        Nom_Cat: Nom_Cat
                    }

                    const responses = await UpdateCat(datos)
                    const objRes = {
                        affectedRows: responses.affectedRows
                    }
                    response(res, 200, 200, objRes);

                }






            } else {
                response(res, 401, 401, "You don't have permissions");
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

            const category = await GetCatxId(id)

            if (category.length > 0) {

                const responses = await deleteCat(id)


                response(res, 200, 200, responses);



            } else {
                response(res, 200, 204, category);
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
