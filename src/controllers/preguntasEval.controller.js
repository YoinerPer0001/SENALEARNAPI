import { preguntaseval } from "../models/preguntasEval.model.js";
import { response } from "../utils/responses.js";
import jsonwebtoken from 'jsonwebtoken'
import { adminPermissions, InstPermissions } from "../utils/manage.permissions.js";
import uniqid from 'uniqid'
import 'dotenv/config'
import { where } from "sequelize";
import { evaluacion } from "../models/evaluacion.model.js";

const jwt = jsonwebtoken;


//cuando el usuario quiera acceder a las preguntas de la evaluacion verificamos que todo el contenido de el modulo donde se encuentra alojado la evaluacion tenga el estado visto en 1

//get  questions by evaluation's id
export const GetQuestionsxId = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {
        if (err) {
            response(res, 401, 401, "Invalid Token");
        } else {

            try {
                const { id } = req.params;

                const evaluacions = await evaluacion.findByPk(id);

                if (evaluacions) {
                    const preguntas = await preguntaseval.findAll({ where: { Id_Eval_FK: id } })

                    if (preguntas) {
                        response(res, 200, 200, preguntas);
                    } else {
                        response(res, 404, 404, 'Questions not found');
                    }

                } else {
                    response(res, 404, 404, 'evaluation not found');
                }

            } catch (err) {
                response(res, 500, 500, err);
            }
        }
    })

}

// create Questions
export const createQuestion = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {

        if (err) {
            response(res, 401, 401, 'Error Token');
        } else {

            try {

                const { Id_Rol_FK } = data.user;

                //verify user permissions
                const adminPermiso = adminPermissions(Id_Rol_FK);

                if (!adminPermiso) {

                    response(res, 403, 403, "you dont have permissions");

                } else {

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
                            response(res, 200);
                        } else {
                            response(res, 500, 500, "error creating rol");
                        }

                    }


                }
            } catch (err) {

                response(res, 500, 500, "something went wrong");
            }
        }


    })
}
// //update Questions
export const UpdateQuestions = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, dat) => {
        if (err) {
            response(res, 401, 401, "Error Token");
        } else {

            try {
                const { Id_Rol_FK } = dat.user;

                let adPermision = adminPermissions(Id_Rol_FK);
                let instPermiso = InstPermissions(Id_Rol_FK);

                if (adPermision || instPermiso) {

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

                        if(datos.Id_Eval){

                            const evaluations = await evaluacion.findByPk(datos.Id_Eval)

                            if(!evaluations){
                                response(res, 404, 404, "evaluation not found");
                            }else{

                                datosEnv = {
                                    Text_Preg_Eval: datos.Text_Preg_Eval || pregunta.Text_Preg_Eval,
                                    Id_Eval_FK: datos.Id_Eval
                                }
                            }
                        }else{
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

                } else {
                    response(res, 401, 401, "You don't have permissions");
                }

            } catch (err) {
                response(res, 500, 500, err);
            }
        }
    })
}