import { preguntaseval } from "../models/preguntasEval.model.js";
import { response } from "../utils/responses.js";
import jsonwebtoken from 'jsonwebtoken'
import uniqid from 'uniqid'
import 'dotenv/config'
import { evaluacion } from "../models/evaluacion.model.js";
import { Contenido_Modulos } from "../models/contenido_modulo.model.js";
import { Modulocurso } from "../models/modulos_cursos.model.js";
import { Usuario_contenido } from "../models/usuario_contenidos.model.js";
import { respuestaseval } from "../models/respuestasEval.model.js";

const jwt = jsonwebtoken;


//cuando el usuario quiera acceder a las preguntas de la evaluacion verificamos que todo el contenido de el modulo donde se encuentra alojado la evaluacion tenga el estado visto en 1

//get  questions by evaluation's id
export const GetQuestionsxId = async (req, res) => {

    try {
        const { id } = req.params;

        let evaluacions = await evaluacion.findByPk(id)
        if (evaluacions) {
            if (user) {
                evaluacions = evaluacions.dataValues;
                //verificamos que el contenido asociado al modulo de la evaluacion esté visto
                const { Id_User } = data.user;
                //verificamos el modulo
                const contenidos = await Contenido_Modulos.findAll({
                    include: [{
                        model: Modulocurso,
                        where: { Id_Mod: evaluacions.Id_Mod_Cur_FK }

                    }]

                })

                const NumberConts = contenidos.length;

                // verificar que los contenidos existan el la tabla de contenido visto

                const Cont_Existe = await Usuario_contenido.findAll({
                    where: { Id_User_FK: Id_User },
                    include: {
                        model: Contenido_Modulos,
                        include: {
                            model: Modulocurso,
                            where: { Id_Mod: evaluacions.Id_Mod_Cur_FK }
                        }
                    }
                })

                const numberView = Cont_Existe.length;

                if (numberView == NumberConts) {
                    const preguntas = await preguntaseval.findAll({
                        attributes: { exclude: ['createdAt', 'updatedAt'] }, include: [{
                            model: respuestaseval, as: 'Respuestas', attributes: ['Id_Res_Eval', 'Text_Resp_Eval']
                        }]
                    })
                    response(res, 200, 200, preguntas);
                } else {
                    response(res, 403, 403, "View all module content is required");
                }

            } else {


                const preguntas = await preguntaseval.findAll({ where: { Id_Eval_FK: id } })

                if (preguntas) {
                    response(res, 200, 200, preguntas);
                } else {
                    response(res, 404, 404, 'Questions not found');
                }
            }



        } else {
            response(res, 404, 404, 'evaluation not found');
        }

    } catch (err) {
        response(res, 500, 500, err);
    }
}


// create Questions
export const createQuestion = async (req, res) => {

    try {
        const Id_Preg_Eval = uniqid();

        const { Text_Preg_Eval, Id_Eval } = req.body;

        const evaluacions = await evaluacion.findByPk(Id_Eval);

        if (!evaluacions) {
            response(res, 404, 404, "evaluation not found");
        } else {

            //create a rol
            const datos = {
                Id_Preg_Eval: Id_Preg_Eval,
                Text_Preg_Eval: Text_Preg_Eval,
                Id_Eval_FK: Id_Eval
            }

            const newRol = await preguntaseval.create(datos);
            if (newRol) {
                response(res, 200, 200, {insertedId: Id_Preg_Eval});
            } else {
                response(res, 500, 500, "error creating rol");
            }

        }



    } catch (err) {

        response(res, 500, 500, err);
    }
}

// //update Questions
export const UpdateQuestions = async (req, res) => {

    try {

        //Data
        const { id } = req.params;
        const datos = req.body;

        //verify exist ROL
        let datosEnv;
        let pregunta = await preguntaseval.findByPk(id)


        if (!pregunta) {
            response(res, 404, 404, "Question not found");

        } else {
            pregunta = pregunta.dataValues;

            if (datos.Id_Eval) {

                const evaluations = await evaluacion.findByPk(datos.Id_Eval)

                if (!evaluations) {
                    response(res, 404, 404, "evaluation not found");
                } else {

                    datosEnv = {
                        Text_Preg_Eval: datos.Text_Preg_Eval || pregunta.Text_Preg_Eval,
                        Id_Eval_FK: datos.Id_Eval
                    }
                }
            } else {
                datosEnv = {
                    Text_Preg_Eval: datos.Text_Preg_Eval || pregunta.Text_Preg_Eval
                }
            }

            const responses = await preguntaseval.update(datosEnv, { where: { Id_Preg_Eval: id } })

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

export const deleteQuestions = async (req, res)=>{
    try{
        const {id} = req.params;

        //we verify thats exist
        const question = await preguntaseval.findByPk(id)

        if (!question) {
            return response(res, 404,404, 'Question not found')
        }else{
            //we verify that it doesn't related whith Answers
            const exist = await respuestaseval.findOne({where: {Id_Preg_Eval_FK: id}})

            if(!exist){
                const updated = await preguntaseval.update({ESTADO_REGISTRO: 0}, {where: {Id_Preg_Eval: id} })
                response(res, 200)
            }else{  
                response(res, 500,500, "Error deleting, this question has related answers")
            }
        }

    }catch(err){
        response(res, 500,500, err)
    }
}
