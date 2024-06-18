import 'dotenv/config'
import uniqid from 'uniqid';
import { response } from "../utils/responses.js";
import { evaluacion } from "../models/evaluacion.model.js";
import { Modulocurso } from "../models/modulos_cursos.model.js";
import { Resultados_Evaluacione } from '../models/resultadosEval.model.js';
import { preguntaseval } from '../models/preguntasEval.model.js';
import { respuestaseval } from '../models/respuestasEval.model.js';

const objInclude = [
    {
        model: preguntaseval,
        attributes: { exclude: ['createdAt','updatedAt']},
        include: [
            {
                model: respuestaseval,
                as: 'Respuestas',
                attributes: { exclude: ['createdAt','updatedAt','Resp_Correcta_Eval']},
                where: {ESTADO_REGISTRO : 1},
                required: false
            }
        ]
    }
]

//get all evaluations
export const GetEvaluaciones = async (req, res) => {

    try {

        const Evaluaciones = await evaluacion.findAll({
            include: objInclude
        });

        if (Evaluaciones) {
            response(res, 200, 200, Evaluaciones);
        } else {
            response(res, 404);
        }

    } catch (error) {

        response(res, 500, 500, error);
    }
}

//get  evaluation by id
export const GetEvalxId = async (req, res) => {

    try {
        const { id } = req.params;

        const Evaluation = await evaluacion.findByPk(id, {
            attributes: { exclude: ['createdAt','updatedAt']},
            include: objInclude
        })

        if (Evaluation) {
            response(res, 200, 200, Evaluation);
        } else {
            response(res, 404);
        }

    } catch (err) {

        response(res, 500, 500, err);
    }
}


//get  evaluation by estate
export const GetEvalxState = async (req, res) => {

    try {
        const { status } = req.params;

        const Evaluation = await evaluacion.findAll(
            {
                where: { Estado_Eval: status },
                include: objInclude,
                attributes: { exclude: ['createdAt','updatedAt']},
            })

        if (Evaluation) {
            response(res, 200, 200, Evaluation);
        } else {
            response(res, 404);
        }

    } catch (err) {

        response(res, 500, 500, "something went wrong");
    }
}


//get  evaluations published by module 
export const GetEvalxModule = async (req, res) => {

    try {
        const { module } = req.params;

        const modulo = await Modulocurso.findByPk(module);

        if (!modulo) {
            response(res, 404, 404, "module doesn't exist");
        } else {

            const Evaluation = await evaluacion.findAll({
                 where: { Id_Mod_Cur_FK: module },
                 include: objInclude,
                 attributes: { exclude: ['createdAt','updatedAt']},
                 })

            if (Evaluation) {
                response(res, 200, 200, Evaluation);
            } else {
                response(res, 404);
            }
        }


    } catch (err) {

        response(res, 500, 500, "something went wrong");
    }

}

// create evaluation
export const createEvaluation = async (req, res) => {

    try {

        const Id_Eva = uniqid();

        const { Tit_Eva, Des_Eva, Id_Module_Cur, Nota_Min_Apro } = req.body;

        const module = await Modulocurso.findByPk(Id_Module_Cur)

        if (!module) {
            response(res, 404, 404, "module doesn't exist");
        } else {

            //create evaluation
            const datos = {
                Id_Eva: Id_Eva,
                Tit_Eva: Tit_Eva.toLowerCase(),
                Des_Eva: Des_Eva.toLowerCase(),
                Fec_Crea: Date.now(),
                Id_Mod_Cur_FK: Id_Module_Cur,
                Not_Min_Apr_Eva: Nota_Min_Apro
            }

            const newEvaluation = await evaluacion.create(datos);
            if (newEvaluation) {
                response(res, 200, 200, { insertedId: Id_Eva });
            } else {
                response(res, 500, 500, "error creating category");
            }
        }


    } catch (err) {

        response(res, 500, 500, err);
    }
}


//update evauations
export const UpdateEvaluations = async (req, res) => {

    try {

        //Data
        const { id } = req.params;
        const datos = req.body;

        const evaluation = await evaluacion.findByPk(id)

        if (!evaluation) {

            response(res, 404, 404, "Evaluation not found");

        } else {
            const dataEval = evaluation.dataValues;


            const datosEnv = {
                Tit_Eva: datos.Tit_Eva.toLowerCase() || dataEval.Tit_Eva,
                Des_Eva: datos.Des_Eva.toLowerCase() || dataEval.Des_Eva,
                Fec_Crea: datos.Fec_Crea || dataEval.Fec_Crea,
                Id_Mod_Cur_FK: datos.Id_Module_Cur || dataEval.Id_Mod_Cur,
                Not_Min_Apr_Eva: datos.Nota_Min_Apro || dataEval.Nota_Min_Apr
            }

            const responses = await evaluacion.update(datosEnv, { where: { Id_Eva: id } })
            if (responses) {
                response(res, 200);
            } else {
                response(res, 500, 500, "error updating category");
            }


        }

    } catch (err) {
        response(res, 500, 500, "something went wrong");
    }

}

//delete evaluation
export const deleteEval = async (req, res) => {
    try {

        const { id } = req.params

        const evaluacions = await evaluacion.findByPk(id)
        if (evaluacions) {
            //verify that evaluation dont has resources asociated
            const preguntas = await preguntaseval.findAll({ where: { Id_Eval_FK: id } })
            const resultados = await Resultados_Evaluacione.findAll({ where: { Id_Eval_FK: id } })

            if (preguntas.length > 0 || resultados.length > 0) {
                response(res, 409, 409, "evaluations has resources asociated");
            } else {
                const responses = await evaluacion.update({ ESTADO_REGISTRO: 0 }, { where: { Id_Eva: id } })
                if (responses) {
                    response(res, 200);
                } else {
                    response(res, 500, 500, "error deleting evaluation");
                }
            }

        } else {
            response(res, 404, 404, "evaluation not found");
        }

    } catch (err) {
        response(res, 500, 500, err);
    }
}

