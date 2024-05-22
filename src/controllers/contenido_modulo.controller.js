import 'dotenv/config'
import uniqid from 'uniqid';
import { response } from "../utils/responses.js";
import { Contenido_Modulos } from "../models/contenido_modulo.model.js";
import { Modulocurso } from '../models/modulos_cursos.model.js'
import { Cursos } from "../models/cursos.model.js";
import { sequelize } from "../database/db.js";
import { Usuario_contenido } from '../models/usuario_contenidos.model.js';



//get module content by id module
export const GetContModuloxModule = async (req, res) => {

    try {
        const { id } = req.params;

        const modules = await Modulocurso.findByPk(id)

        if (modules) {
            const content = await Contenido_Modulos.findAll({ where: { Id_Mod_FK: id } })
            if (content) {
                response(res, 200, 200, content)
            } else {
                response(res, 404, 404, 'content not found');
            }

        } else {
            response(res, 404, 404, 'module not found');
        }

    } catch (err) {
        response(res, 500, 500, err)
    }

}

// create cont module
export const createContModu = async (req, res) => {
    let trasaction;

    try {
        trasaction = await sequelize.transaction();

        const Id_Cont = uniqid();

        const { Indice, Id_Mod_FK, Tit_Cont } = req.body;

        let moduleCourseExist = await Modulocurso.findByPk(Id_Mod_FK);

        if (moduleCourseExist) {

            // verificamos que el induce no este repetido en el modulo 
            const indiceExist = await Contenido_Modulos.findOne({ where: { Indice_Cont: Indice, Id_Mod_FK: Id_Mod_FK  } })

            if (!indiceExist) {
                //create 
                const datosEnv = {
                    Id_Cont: Id_Cont,
                    // Tip_Cont: Tip_Cont,
                    // Url_Cont: datos.Url_Cont,
                    Tit_Cont: Tit_Cont,
                    Id_Mod_FK: Id_Mod_FK,
                    // Duracion_Cont:datos.Duracion,
                    Indice_Cont: Indice
                }

                


                const newModule = await Contenido_Modulos.create(datosEnv, { transaction: trasaction });
                if (newModule) {
                    //verificamos el porcentaje del modulo y lo dividimos entre la cantidad de contenido del modulo
                    const { Porcentaje_Asig } = await Modulocurso.findByPk(Id_Mod_FK, { transaction: trasaction })
                    const contenidoTotal = await Contenido_Modulos.count({ where: { Id_Mod_FK: Id_Mod_FK }, transaction: trasaction })
                    const porcentaje = (Porcentaje_Asig / contenidoTotal);

                    //actualizar porcentaje de cada contenido
                    const updatePor = await Contenido_Modulos.update({ Porcentaje_Asig: porcentaje }, { where: { Id_Mod_FK: Id_Mod_FK }, transaction: trasaction })

                    await trasaction.commit();
                    response(res, 200, 200,{insertedId: datosEnv.Id_Cont} );

                } else {
                    response(res, 500, 500, "error creating content module");
                }
            }else{
                response(res, 500, 500, "Indice already exist");
            }

        } else {

            response(res, 404, 404, "module don't exist");
        }



    } catch (err) {
        await trasaction.rollback();
        response(res, 500, 500, err);

    }
}


//update mod cursos
export const UpdateModCur = async (req, res) => {

    let transaction;

    try {

        //Data
        const { id } = req.params;
        const data = req.body;

        //verify exist 

        let cont_mod = await Contenido_Modulos.findByPk(id)

        if (!cont_mod) {

            response(res, 404, 404, "Content not found");

        } else {

            let datos;
            cont_mod = cont_mod.dataValues;

            if (data.Id_Mod_FK) {

                const moduleExist = await Modulocurso.findByPk(data.Id_Mod_FK);

                if (moduleExist) {

                    datos = {

                        Tip_Cont: data.Tip_Cont || cont_mod.Tip_Cont,
                        Url_Cont: data.Url_Cont || cont_mod.Url_Cont,
                        Tit_Cont: data.Tit_Cont || cont_mod.Tit_Cont,
                        Indice_Cont: data.Indice || cont_mod.Indice_Cont,
                        Duracion_Cont: data.Duracion || cont_mod.Duracion_Cont,
                        Id_Mod_FK: data.Id_Mod_FK

                    }

                } else {
                    response(res, 404, 404, "Module don't exist");
                }

            } else {

                datos = {

                    Tip_Cont: data.Tip_Cont || cont_mod.Tip_Cont,
                    Url_Cont: data.Url_Cont || cont_mod.Url_Cont,
                    Tit_Cont: data.Tit_Cont || cont_mod.Tit_Cont,
                    Indice_Cont: data.Indice || cont_mod.Indice_Cont,
                    Duracion_Cont: data.Duracion || cont_mod.Duracion_Cont,
                    Id_Mod_FK: cont_mod.Id_Mod_FK

                }

            }

            transaction = await sequelize.transaction();

            const responses = await Contenido_Modulos.update(datos, { where: { Id_Cont: id }, transaction: transaction })
            if (responses) {


                //actualizar duracion total del curso en la tabla de cursos hor_cont_total
                const { Id_Cur_FK, Horas_Cont_Mod } = await Modulocurso.findByPk(datos.Id_Mod_FK);
                const { Hor_Cont_Total } = await Cursos.findByPk(Id_Cur_FK)
                const cursoHorCont = await Cursos.update({ Hor_Cont_Total: (parseFloat(Hor_Cont_Total) + (datos.Duracion_Cont / 60)) }, { where: { Id_Cur: Id_Cur_FK }, transaction: transaction })


                //actualizar horas del contenido del modulo
                const moduleUpdt = await Modulocurso.update({ Horas_Cont_Mod: (parseFloat(Horas_Cont_Mod) + (datos.Duracion_Cont / 60)) }, { where: { Id_Mod: datos.Id_Mod_FK }, transaction: transaction })
                await transaction.commit();
                response(res, 200);
            } else {
                await transaction.rollback()
                response(res, 500, 500, "error updating content module");
            }

        }


    } catch (err) {

        response(res, 500, 500, err);
    }
}

//delete cont module
export const deleteCont = async (req, res) => {
    try {

        const { id } = req.params

        const contMod = await Contenido_Modulos.findByPk(id)
        if (contMod) {
            //verify that content dont have users asociated
            const usuariosCont = await Usuario_contenido.findAll({ where: { Id_Cont_Mod_FK: id } })

            if (usuariosCont.length > 0) {
                response(res, 409, 409, "Content has users asociated");
            } else {
                const responses = await Contenido_Modulos.update({ ESTADO_REGISTRO: 0 }, { where: { Id_Cont: id } })
                if (responses) {
                    response(res, 200);
                } else {
                    response(res, 500, 500, "error deleting content");
                }
            }

        } else {
            response(res, 404, 404, "Category not found");
        }

    } catch (err) {
        response(res, 500, 500, err);
    }
}


