import jsonwebtoken from "jsonwebtoken"
import { adminPermissions, InstPermissions } from "../managePermissions/manage.permissions.js";
import 'dotenv/config'
import uniqid from 'uniqid';
import { response } from "../Resources/responses.js";
import { getModulexCourse, createModule, getModulexId, UpdateCurModules } from "../models/modulos_cursos.model.js";
import { getCoursesxId } from "../models/cursos.model.js";

const jwt = jsonwebtoken;

//get  modules by course's id -- OK
export const GetModulesxId = async (req, res) => {

    try {
        const { id } = req.params;

        //verificams que exista el curso
        const course = getCoursesxId(id);
        if (course.length > 0) {
            const module = await getModulexCourse(id)

            response(res, 200, 200, module);

        } else {
            response(res, 500, 103, "Something went wrong");
        }


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
            const courseExists = await getCoursesxId(Id_Cur)


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
                        Id_Mod: Id_Mod,
                        Tit_Mod: Tit_Mod,
                        Est_Mod: Est_Mod,
                        Id_Cur_FK: Id_Cur,
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
export const UpdateModules = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, dat) => {
        if (err) {
            response(res, 400, 105, "Something went wrong");
        }

        try {
            const { Id_Rol_FK } = dat.user;

            const adPermision = adminPermissions(Id_Rol_FK);
            const InstrucPermissions = InstPermissions(Id_Rol_FK);


            if (adPermision || InstrucPermissions) {

                //Data


                const { id } = req.params;
                const modData = req.body;

                //verify exist module
                const module = await getModulexId(modData.Id_Mod);

                if (module.length < 1) {

                    response(res, 500, 103, "Something went wrong");

                } else {

                    const datos = {
                        Id_Mod: id,
                        Tit_Mod: modData.Tit_Mod || module[0].Tit_Mod,
                        Est_Mod: modData.Est_Mod || module[0].Est_Mod,
                        Id_Cur_FK:modData.Id_Cur || module[0].Id_Cur_FK,
                        Horas_Cont_Mod:modData.Horas_Cont_Mod || module[0].Horas_Cont_Mod
                    }

                    // si se quiere actualizar el curso al que pertenece verificamos que exista el curso
                    if (modData.Id_Cur) {
                        const course = await getCoursesxId(modData.Id_Cur);

                        if (course.length < 1) {
                            response(res, 500, 103, "Something went wrong");

                        } else {

                            const modUpdated = UpdateCurModules(datos);
                            const objRes = {
                                affectedRows : modUpdated.affectedRows
                            }
                            response(res,200,200,objRes);
                        }
                    }else{

                        const modUpdated = UpdateCurModules(datos);
                            const objRes = {
                                affectedRows : modUpdated.affectedRows
                            }
                            response(res,200,200,objRes);
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

