import 'dotenv/config'
import uniqid from 'uniqid';
import { response } from "../utils/responses.js";
import { Objetivos_Cursos } from "../models/objetivos_cursos.model.js";
import { Cursos } from "../models/cursos.model.js";
import { sequelize } from '../database/db.js';



//get objetive by course id
export const GetAllObjxCourse = async (req, res) => {

    try {
        const { id } = req.params;

        const courses = await Objetivos_Cursos.findAll({ where: { Id_Cur_FK: id, ESTADO_REGISTRO: 1 }, attributes:{exclude:['createdAt', 'updatedAt']} })

        if (courses) {
            response(res, 200, 200, courses);
        } else {
            response(res, 404, 404, 'Not Found');
        }

    } catch (err) {
        response(res, 500, 500, err);
    }

}

// create COURSE objetives
export const createObjCour = async (req, res) => {
    let transaction;
    try {

        const { objetivos, Id_Cur } = req.body;

        //verificamos que exista el curso
        const courseExist = await Cursos.findByPk(Id_Cur);

        if (!courseExist) {

            response(res, 404, 404, "course not found");
        } else {

            transaction = await sequelize.transaction();
            let newObjetive;

            for(let objetivo of objetivos){

                //obj create
                const datos = {
                    Id_Objetivo: uniqid(),
                    Desc_Objetivo: objetivo.Desc_Objetivo.toLowerCase(),
                    Id_Cur_FK: Id_Cur
                }

                newObjetive = await Objetivos_Cursos.create(datos, { transaction: transaction });

            }
      
                await transaction.commit();
                response(res, 200);
            
            
        }

    } catch (err) {
        await transaction.rollback();
        response(res, 500, 500, 'Something went wrong');
    }
}

//update categorias
export const UpdateObjetivesCour = async (req, res) => {

    try {
        //Data
        const { id } = req.params;
        const datosRec = req.body;
        let datos;

        //verify objetive exist

        let objetive = await Objetivos_Cursos.findByPk(id)

        if (!objetive) {

            response(res, 404, 404, "Objetive not found");

        } else {
            objetive = objetive.dataValues;


            if (datosRec.Id_Cur) {

                let course = await Cursos.findByPk(datosRec.Id_Cur);

                if (course) {
                    course = course.dataValues;

                    datos = {
                        Desc_Objetivo: datosRec.Desc_Objetivo || objetive.Desc_Objetivo,
                        Id_Cur_FK: datosRec.Id_Cur
                    }


                } else {
                    response(res, 404, 404, "course don't exist");
                }

            } else {

                datos = {
                    Desc_Objetivo: datosRec.Desc_Objetivo,
                    Id_Cur_FK: datosRec.Id_Cur || objetive.Id_Cur_FK
                }

            }


            const responses = await Objetivos_Cursos.update(datos, { where: { Id_Objetivo: id } })
            if (responses) {
                response(res, 200);
            } else {
                response(res, 500, 500, "Error updating objetive");
            }
        }


    } catch (err) {
        response(res, 500, 500, "something went wrong");
    }
}

//delete
export const deleteObj = async (req, res,) => {
    try {
        const { id } = req.params;
        const objetivo = await Objetivos_Cursos.findByPk(id)
        if (!objetivo) {
            response(res, 404, 404, 'Objetive not found');
        } else {

            const deleted = await Objetivos_Cursos.update({ ESTADO_REGISTRO: 0 }, { where: { Id_Objetivo: id } })

            if (deleted) {
                response(res, 200, 200);
            } else {
                response(res, 500, 500, 'Error Deleting');
            }
        }

    } catch (err) {
        response(res, 500, 500, err);
    }

}