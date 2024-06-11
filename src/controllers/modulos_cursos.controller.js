import jsonwebtoken from "jsonwebtoken"
import 'dotenv/config'
import uniqid from 'uniqid';
import { response } from "../utils/responses.js";
import { Modulocurso } from "../models/modulos_cursos.model.js";
import { Cursos } from "../models/cursos.model.js";
import { Contenido_Modulos } from "../models/contenido_modulo.model.js";
import { evaluacion } from "../models/evaluacion.model.js";

const jwt = jsonwebtoken;

//get  modules by course's id -- OK
export const GetModulesxId = async (req, res) => {

    try {
        const { id } = req.params;

        //verificams que exista el curso
        const course = await Cursos.findByPk(id);
        const moduleList = [];

        if (course) {
            const module = await Modulocurso.findAll({
                where: { Id_Cur_FK: id },
                include: {
                    model: Contenido_Modulos,
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                    where: {ESTADO_REGISTRO: 1}
                }
            })

            module.map(module => {
               if(module.toJSON().Contenido_Modulos.ESTADO_REGISTRO != 0){
                moduleList.push(module.toJSON());
               }
            })
            if (module) {
                response(res, 200, 200, moduleList);
            } else {
                response(res, 404, 404, 'Modules not Found');
            }


        } else {
            response(res, 404, 404, "Course not found");
        }


    } catch (err) {
        response(res, 500, 500, err);
    }

}

// create new modules
export const createModules = async (req, res) => {

    try {

        const { Tit_Mod, Id_Cur } = req.body;


        //cositas   
        const Id_Mod = uniqid();

        const courseExists = await Cursos.findByPk(Id_Cur)

        if (!courseExists) {

            response(res, 401, 401, "course don't exist");

        } else {

            //create category
            const datos = {
                Id_Mod: Id_Mod,
                Tit_Mod: Tit_Mod,
                Id_Cur_FK: Id_Cur
            }

            const newModule = await Modulocurso.create(datos);
            if (newModule) {

                //actualizamos los porcentajes asignados segun el numero de modulos
                const modules = await Modulocurso.findAll({ where: { Id_Cur_FK: Id_Cur } })
                const porentajes = 100 / modules.length || 1;

                const update = await Modulocurso.update({ Porcentaje_Asig: porentajes }, { where: { Id_Cur_FK: Id_Cur } })
                if (update) {
                    response(res, 200, 200, { insertedId: datos.Id_Mod });
                } else {
                    response(res, 500, 500, "error creating module");
                }
            } else {
                response(res, 500, 500, "error creating module");
            }

        }

    } catch (err) {
        response(res, 500, 500, "something went wrong");
    }
}


//update modules
export const UpdateModules = async (req, res) => {

    try {

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


    } catch (err) {

        response(res, 500, 500, err);
    }

}

//delete evaluation
export const deleteMod = async (req, res) => {
    try {

        const { id } = req.params

        const modulo = await Modulocurso.findByPk(id)
        if (modulo) {
            //verify that module dont has resources asociated
            const contenido = await Contenido_Modulos.findAll({ where: { Id_Mod_FK: id } })
            const evaluaciones = await evaluacion.findAll({ where: { Id_Mod_Cur_FK: id } })

            if (contenido.length > 0 || evaluaciones.length > 0) {
                response(res, 409, 409, "Modules has resources asociated");

            } else {

                const responses = await Modulocurso.update({ ESTADO_REGISTRO: 0 }, { where: { Id_Mod: id } })
                if (responses) {
                    response(res, 200);
                } else {
                    response(res, 500, 500, "error deleting module");
                }
            }

        } else {
            response(res, 404, 404, "module not found");
        }

    } catch (err) {
        response(res, 500, 500, err);
    }
}

