import jsonwebtoken from "jsonwebtoken"
import { adminPermissions, InstPermissions } from "../utils/manage.permissions.js";
import 'dotenv/config'
import uniqid from 'uniqid';
import { response } from "../utils/responses.js";
import { GetContModxIdMod, createContModules, updateContMod, GetContModxId } from "../models/contenido_modulo.model.js";
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
export const createContModu = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {

        if (err) {
            response(res, 500, 105, "Something went wrong");
        }

        try {

            const Id_Cont = uniqid();

            const { Tip_Cont, Url_Cont, Tit_Cont, Id_Mod_FK } = req.body;

            if (!Tip_Cont || !Url_Cont || !Tit_Cont || !Id_Mod_FK) {

                response(res, 400, 102, "Something went wrong");

            } else {

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

                        const newModule = await createContModules(datos);
                        const objResp = {
                            insertId: Id_Cont
                        }

                        response(res, 200, 200, objResp);


                    }


                } else {
                    response(res, 400, 103, "module don't exist");
                }



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

// //update mod cursos
export const UpdateModCur = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, dat) => {
        if (err) {
            response(res, 400, 105, "Something went wrong");
        }

        try {
            const { Id_Rol_FK } = dat.user;

            let adPermision = adminPermissions(Id_Rol_FK);
            let InstPermiso = InstPermissions(Id_Rol_FK);

            if (adPermision || InstPermiso) {

                //Data


                const { id } = req.params;
                const { Tip_Cont, Url_Cont, Tit_Cont, Id_Mod_FK } = req.body;

                //verify exist 

                const cont_mod = await GetContModxId(id)

                if (cont_mod.length < 1) {

                    response(res, 500, 103, "Something went wrong");

                } else {

                    let datos;

                    if (Id_Mod_FK) {

                        const moduleExist = await getModulexId(Id_Mod_FK);

                        if (moduleExist.length > 0) {

                            datos = {
                                Id_Cont: id || cont_mod[0].Id_Cont,
                                Tip_Cont: Tip_Cont || cont_mod[0].Tip_Cont,
                                Url_Cont: Url_Cont || cont_mod[0].Url_Cont,
                                Tit_Cont: Tit_Cont || cont_mod[0].Tit_Cont,
                                Id_Mod_FK: Id_Mod_FK || cont_mod[0].Id_Mod_FK

                            }



                        } else {
                            response(res, 400, 103, "content module don't exist");
                        }

                    } else {

                        datos = {
                            Id_Cont: id || cont_mod[0].Id_Cont,
                            Tip_Cont: Tip_Cont || cont_mod[0].Tip_Cont,
                            Url_Cont: Url_Cont || cont_mod[0].Url_Cont,
                            Tit_Cont: Tit_Cont || cont_mod[0].Tit_Cont,
                            Id_Mod_FK: cont_mod[0].Id_Mod_FK

                        }

                    }

                    const responses = await updateContMod(datos)
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

