import { respuestaseval } from "../models/respuestasEval.model.js";
import { response } from "../utils/responses.js";
import jsonwebtoken from 'jsonwebtoken'
import uniqid from 'uniqid'
import 'dotenv/config'
import { preguntaseval } from "../models/preguntasEval.model.js";
import { sequelize } from "../database/db.js";




//get  answers by questions's id
export const GetAnswersxId = async (req, res) => {

    try {
        const { id } = req.params;

        const evaluacions = await preguntaseval.findByPk(id);

        if (evaluacions) {
            const preguntas = await respuestaseval.findAll({ where: { Id_Preg_Eval_FK: id }, attributes: { exclude: ['Resp_Correcta_Eval', 'createdAt', 'updatedAt'] } })

            if (preguntas) {
                response(res, 200, 200, preguntas);
            } else {
                response(res, 404, 404, 'Questions not found');
            }

        } else {
            response(res, 404, 404, 'Questions not found');
        }

    } catch (err) {
        response(res, 500, 500, err);
    }
}


// create Questions
export const createAnswer = async (req, res) => {

    try {



        //const { Text_Resp_Eval, Resp_Correcta_Eval, Id_Preg_Eval } = req.body;

        const { Respuestas, Id_Preg_Eval } = req.body;

        const question = await preguntaseval.findByPk(Id_Preg_Eval);

        if (!question) {
            response(res, 404, 404, "question not found");
        } else {

            let promesasList = [];

            Respuestas.forEach(respuesta => {
                const Id_Res_Eval = uniqid();

                const datos = {
                    Id_Res_Eval: Id_Res_Eval,
                    Text_Resp_Eval: respuesta.Text_Resp_Eval,
                    Resp_Correcta_Eval: respuesta.Resp_Correcta_Eval,
                    Id_Preg_Eval_FK: Id_Preg_Eval
                }

                promesasList.push(respuestaseval.create(datos))

            });

            const responses = await Promise.all(promesasList)

            response(res, 200);

        }

    } catch (err) {

        response(res, 500, 500, err);
    }
}


// //update Questions
export const UpdateAnswers = async (req, res) => {

    try {

        //Data
        const { id } = req.params;
        const datos = req.body;

        //verify exist ROL
        let datosEnv;
        let answer = await respuestaseval.findByPk(id)


        if (!answer) {
            response(res, 404, 404, "answer not found");

        } else {
            answer = answer.dataValues;

            if (datos.Id_Preg_Eval) {

                const evaluations = await preguntaseval.findByPk(datos.Id_Preg_Eval)

                if (!evaluations) {
                    response(res, 404, 404, "question not found");
                } else {

                    datosEnv = {
                        Text_Resp_Eval: datos.Text_Resp_Eval || answer.Text_Resp_Eval,
                        Resp_Correcta_Eval: datos.Resp_Correcta_Eval || answer.Resp_Correcta_Eval,
                        Id_Eval_FK: datos.Id_Preg_Eval
                    }
                }
            } else {
                datosEnv = {
                    Text_Resp_Eval: datos.Text_Resp_Eval || answer.Text_Resp_Eval,
                    Resp_Correcta_Eval: datos.Resp_Correcta_Eval || answer.Resp_Correcta_Eval,
                }
            }
            console.log(datosEnv)
            const responses = await respuestaseval.update(datosEnv, { where: { Id_Res_Eval: id } })

            if (responses) {
                response(res, 200);
            } else {
                response(res, 500, 500, "error updating rol");
            }
        }



    } catch (err) {
        response(res, 500, 500, err);
    }
}

export const deleteAnswer = async (req, res) => {
    try {

        const { id } = req.params

        const resp = await respuestaseval.findByPk(id)
        if (resp) {

            const responses = await respuestaseval.update({ ESTADO_REGISTRO: 0 }, { where: { Id_Res_Eval: id } })
            if (responses) {
                response(res, 200);
            } else {
                response(res, 500, 500, "error deleting answer");
            }


        } else {
            response(res, 404, 404, "Answer not found");
        }

    } catch (err) {
        response(res, 500, 500, err);
    }
}


