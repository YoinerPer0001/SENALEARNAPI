import jsonwebtoken from "jsonwebtoken"
import 'dotenv/config'
import uniqid from 'uniqid';
import { response } from "../utils/responses.js";
import { Requisitos_previo } from "../models/requisitos_previos.model.js";
import { Cursos } from "../models/cursos.model.js";
import { sequelize } from "../database/db.js";

const jwt = jsonwebtoken;

//get  Requirements by id
export const GetReqxCurso = async (req, res) => {

    try {
        const { id } = req.params;

        const curso = await Cursos.findByPk(id)

        if (curso) {
            const requisitos = await Requisitos_previo.findAll({ where: { Id_Cur_FK: id } })
            if (requisitos) {
                response(res, 200, 200, requisitos);
            } else {
                response(res, 404, 404, 'requirements not found');
            }
        } else {
            response(res, 404, 404, 'course not found');
        }

    } catch (err) {

        response(res, 500, 500, "something went wrong");
    }

}

// create Requirements
export const createReq = async (req, res) => {
    let transaccion;
    try {

        //Desc_Req
        const { requisitos, Id_Cur } = req.body;

        //verificamos que exista el curso
        const curso = await Cursos.findByPk(Id_Cur)

        if (!curso) {

            response(res, 404, 404, "course not found");

        } else {

            transaccion = await sequelize.transaction();

            for (let requisito of requisitos) {
                //create req
                const datos = {
                    Id_Req: uniqid(),
                    Desc_Req: requisito.Desc_Req.toLowerCase(),
                    Id_Cur_FK: Id_Cur
                }

                await Requisitos_previo.create(datos, { transaction: transaccion });
            }



            await transaccion.commit()

            response(res, 200);

        }

    } catch (err) {
        if (transaccion) await transaccion.rollback();
        response(res, 500, 500, "something went wrong");
    }
}

//update categorias
export const UpdateReq = async (req, res) => {

    try {

        //Data
        const { id } = req.params;
        const datos = req.body;

        //verify exist category

        let requisito = await Requisitos_previo.findByPk(id)

        if (!requisito) {

            response(res, 404, 404, "Requirement not found");

        } else {

            requisito = requisito.dataValues;
            let datosEnv;


            if (datos.Id_Cur) {
                const curso = await Cursos.findByPk(datos.Id_Cur)
                if (!curso) {
                    response(res, 404, 404, "course not found");
                } else {
                    datosEnv = {
                        Desc_Req: datos.Desc_Req || requisito.Desc_Req,
                        Id_Cur_FK: datos.Id_Cur.toLowerCase()
                    }
                }
            } else {

                datosEnv = {
                    Desc_Req: datos.Desc_Req || requisito.Desc_Req
                }
            }

            const responses = await Requisitos_previo.update(datosEnv, { where: { Id_Req: id } })
            if (responses) {
                response(res, 200);
            } else {
                response(res, 500, 500, "error updating requeriment");
            }

        }

    } catch (err) {
        response(res, 500, 500, "something went wrong");
    }

}



export const deleteReqPrev = async (req, res) => {
    try {

        const { id } = req.params

        const requisito = await Requisitos_previo.findByPk(id)
        if (requisito) {

            const responses = await Requisitos_previo.update({ ESTADO_REGISTRO: 0 }, { where: { Id_Req: id } })
            if (responses) {
                response(res, 200);
            } else {
                response(res, 500, 500, "error deleting category");
            }
        } else {
            response(res, 404, 404, "Category not found");
        }

    } catch (err) {
        response(res, 500, 500, err);
    }
}

