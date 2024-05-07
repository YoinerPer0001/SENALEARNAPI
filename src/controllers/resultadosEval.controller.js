import { response } from "../utils/responses.js";
import jsonwebtoken from 'jsonwebtoken'
import { Usuario } from "../models/users.model.js";
import 'dotenv/config.js'
import uniqid from 'uniqid';
import { respuestaseval } from "../models/respuestasEval.model.js";
import { Resultados_Evaluacione } from "../models/resultadosEval.model.js";
import { evaluacion } from "../models/evaluacion.model.js";


export const GetUserResults = async (req, res) => {

    try {

        const { Id_Eval, Id_User } = req.body;
        const evaluation = await evaluacion.findByPk(Id_Eval);
        const user = await Usuario.findByPk(Id_User);
        if (!evaluation || !user) {
            response(res, 404, 404, 'evaluation or user not found');
        } else {
            const data = await Resultados_Evaluacione.findAll({
                where: { Id_Eval_FK: Id_Eval, Id_User_FK: Id_User },
                include: [
                    {
                        model: evaluacion,
                        attributes: { exclude: ['createdAt', 'updatedAt'] }
                    }
                ],
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            })
            if (data) {
                response(res, 200, 200, data);
            } else {
                response(res, 404, 404, 'results not found');
            }
        }


    } catch (err) {
        response(res, 500, 500, err);
    }
}


export const createResult = async (req, res) => {

    try {
        const data = req.body.OBJ;
        const { Id_Eval, Id_User } = req.body;
        const NoPreg = data.length;
        let NoPregCorr = 0;

        const evaluation = await evaluacion.findByPk(Id_Eval);
        const user = await Usuario.findByPk(Id_User);

        if (!evaluation || !user) {
            response(res, 404, 404, 'evaluation or user not found');
        } else {
            const promesas = data.map(pregunta => datosRespuesta(pregunta.Id_Preg, pregunta.Id_Res));


            const values = await Promise.all(promesas)
            values.forEach(value => {
                if (value.Correcta) {
                    NoPregCorr = NoPregCorr + 1;
                }
            })
            const puntuacion = (10.0 * NoPregCorr) / NoPreg;

            const objEnv = {
                Id_Res_Eval: uniqid(),
                Id_Eval_FK: Id_Eval,
                Id_User_FK: Id_User,
                Puntuacion: puntuacion,
                Fech_Real_Eval: Date.now()
            }

            //creamos el intento de evaluacion
            const created = await Resultados_Evaluacione.create(objEnv);

            if (created) {
                response(res, 200, 200, values);
            } else {
                response(res, 500, 500, "error creating evaluation's attempt");
            }
        }

    } catch (err) {
        response(res, 500, 500, err);
    }
}

//edit inscriptions
export const editResult = async (req, res) => {
    try {

        //verify permissions
        const { Id_Rol_FK } = data.user;


        //const { Id_User, Id_Cur, fecha_insc } = req.body;
        const { id } = req.params;
        const datos = req.body



        //verify that the result exists
        let evalResul = await Resultados_Evaluacione.findByPk(id);

        if (!evalResul) {
            response(res, 404, 404, "Evaluation result don't exist");

        } else {

            evalResul = evalResul.dataValues;
            let data;

            //if wants update the evaluation
            if (datos.Id_Eval_New) {

                //we verify that the new evaluation exists
                const evaluation = await evaluacion.findByPk(datos.Id_Eval_New);

                if (!evaluation) {
                    response(res, 404, 404, "New evaluation don't exist");

                } else {


                    //we verify that the new result isn't already exists

                    const NewResEval = await Resultados_Evaluacione.findOne({ where: { Id_User_FK: evalResul.Id_User_FK, Id_Eval_FK: datos.Id_Eval_New } });
                    console.log(NewResEval)
                    if (NewResEval) {
                        response(res, 409, 409, "Evaluation result already registered");
                    } else {

                        data = {

                            Id_Eval_FK: datos.Id_Eval_New,
                            Puntuacion: datos.Puntuacion || evalResul.Puntuacion,
                            Fech_Real_Eval: datos.Fech_Real_Eval || evalResul.Fech_Real_Eval
                        }

                    }
                }
            } else {
                data = {
                    Puntuacion: datos.Puntuacion || evalResul.Puntuacion,
                    Fech_Real_Eval: datos.Fech_Real_Eval || evalResul.Fech_Real_Eval
                }
            }

            //edit the result
            const editedResult = await Resultados_Evaluacione.update(data, { where: { Id_Res_Eval: id } });

            if (editedResult) {

                response(res, 200);
            } else {

                response(res, 500, 500, "Error editing inscription");
            }


        }

    } catch (err) {
        response(res, 500, 500, "something went wrong");

    }
}


const datosRespuesta = async (Id_Preg, Id_resp) => {

    const correcta = await respuestaseval.findOne({
        where: { Id_Res_Eval: Id_resp }
    })

    const respuesta = correcta.Resp_Correcta_Eval;

    const PregVerify = {
        Id_Preg: Id_Preg,
        Id_Resp: Id_resp,
        Correcta: respuesta
    }
    return PregVerify;

}
