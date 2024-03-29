import jsonwebtoken from "jsonwebtoken"
import { adminPermissions, InstPermissions } from "../utils/manage.permissions.js";
import 'dotenv/config'
import uniqid from 'uniqid';
import { response } from "../utils/responses.js";
import { Modulocurso } from "../models/modulos_cursos.model.js";
import { Cursos } from "../models/cursos.model.js";

const jwt = jsonwebtoken;

//get  modules by course's id -- OK
export const GetModulesxId = async (req, res) => {

    try {
        const { id } = req.params;

        //verificams que exista el curso
        const course = await Cursos.findByPk(id);

        if (course) {
            const module = await Modulocurso.findOne({ where: { Id_Cur_FK: id } })
            if (module) {
                response(res, 200, 200, module);
            } else {
                response(res, 404, 404, 'Modules not Found');
            }


        } else {
            response(res, 500, 103, "Something went wrong");
        }


    } catch (err) {
        response(res, 500, 500, err);
    }

}

// create new modules
export const createModules = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {

        if (err) {

            response(res, 401, 401, "Something went wrong");

        } else {

            try {

                const { Tit_Mod, Id_Cur, Horas_Cont_Mod } = req.body;

                const { Id_Rol_FK } = data.user;

                //verify user permissions
                const adminPermiso = adminPermissions(Id_Rol_FK);
                const InstrucPermissions = InstPermissions(Id_Rol_FK);

                if (adminPermiso || InstrucPermissions) {

                    const Id_Mod = uniqid();

                    const courseExists = await Cursos.findByPk(Id_Cur)

                    if (!courseExists) {

                        response(res, 401, 401, "course don't exist");

                    } else {

                        //create category
                        const datos = {
                            Id_Mod: Id_Mod,
                            Tit_Mod: Tit_Mod,
                            Id_Cur_FK: Id_Cur,
                            Horas_Cont_Mod: Horas_Cont_Mod
                        }

                        const newModule = await Modulocurso.create(datos);
                        if (newModule) {
                            response(res, 200);
                        } else {
                            response(res, 500, 500, "error creating module");
                        }

                    }
                } else {

                    response(res, 403, 403, "you dont have permissions");

                }

            } catch (err) {
                response(res, 500, 500, "something went wrong");
            }
        }

    })
}

//update modules
export const UpdateModules = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, dat) => {
        if (err) {
            response(res, 400, 105, "Something went wrong");
        } else {

            try {
                const { Id_Rol_FK } = dat.user;

                const adPermision = adminPermissions(Id_Rol_FK);
                const InstrucPermissions = InstPermissions(Id_Rol_FK);

                if (adPermision || InstrucPermissions) {

                    //Data
                    const { id } = req.params;
                    const modData = req.body;

                    //verify exist module
                    let module = await Modulocurso.findByPk(id);
                    let datos = "";
                    let dataOk = true;

                    if (!module) {

                        response(res, 401, 401, "module not found");

                    } else {
                        module = module.dataValues;

                        if (modData.Id_Cur) {

                            let course = await Cursos.findByPk(modData.Id_Cur);

                            if (course) {

                                datos = {
                                    Tit_Mod: modData.Tit_Mod || module.Tit_Mod,
                                    Est_Mod: modData.Est_Mod || module.Est_Mod,
                                    Id_Cur_FK: modData.Id_Cur,
                                    Horas_Cont_Mod: modData.Horas_Cont_Mod || module.Horas_Cont_Mod
                                }

                            } else {
                                dataOk = false;
                                response(res, 404, 404, 'course not found')
                            }

                        } else {

                            datos = {
                                Tit_Mod: modData.Tit_Mod || module.Tit_Mod,
                                Est_Mod: modData.Est_Mod || module.Est_Mod,
                                Id_Cur_FK: modData.Id_Cur || module.Id_Cur,
                                Horas_Cont_Mod: modData.Horas_Cont_Mod || module.Horas_Cont_Mod
                            }
                        }

                        if (dataOk) {
                            const modUpdated = await Modulocurso.update(datos, { where: { Id_Mod: id } });

                            if (modUpdated) {
                                response(res, 200);
                            } else {
                                response(res, 500, 500, "error updating module");
                            }
                        }

                    }

                } else {
                    response(res, 401, 401, "You don't have permissions");
                }

            } catch (err) {

                response(res, 500, 500, err);
            }

        }
    })
}

