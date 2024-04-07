import jsonwebtoken from "jsonwebtoken"
import { InstPermissions, adminPermissions } from "../utils/manage.permissions.js";
import 'dotenv/config'
import uniqid from 'uniqid';
import { response } from "../utils/responses.js";
import { evaluacion } from "../models/evaluacion.model.js";
import { Modulocurso } from "../models/modulos_cursos.model.js";
import { DATE, where } from "sequelize";

const jwt = jsonwebtoken;

//get all evaluations
export const GetEvaluaciones = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {
        if (err) {
            response(res, 401, 401, "Token Error");
        } else {

            const { Id_Rol_FK } = data.user;

            //verify user permissions
            const adminPermiso = adminPermissions(Id_Rol_FK);
            const instpermiso = InstPermissions(Id_Rol_FK);

            if (!adminPermiso && !instpermiso) {

                response(res, 403, 403, "you dont have permissions");
            } else {

                try {

                    const Evaluaciones = await evaluacion.findAll();

                    if (Evaluaciones) {
                        response(res, 200, 200, Evaluaciones);
                    } else {
                        response(res, 404);
                    }

                } catch (error) {

                    response(res, 500, 500, error);
                }
            }

        }
    })



}

//get  evaluation by id
export const GetEvalxId = async (req, res) => {


    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {
        if (err) {
            response(res, 401, 401, "Token Error");
        } else {

            const { Id_Rol_FK } = data.user;

            //verify user permissions
            const adminPermiso = adminPermissions(Id_Rol_FK);
            const instpermiso = InstPermissions(Id_Rol_FK);

            if (!adminPermiso && !instpermiso) {

                response(res, 403, 403, "you dont have permissions");
            } else {

                try {
                    const { id } = req.params;

                    const Evaluation = await evaluacion.findByPk(id)

                    if (Evaluation) {
                        response(res, 200, 200, Evaluation);
                    } else {
                        response(res, 404);
                    }

                } catch (err) {

                    response(res, 500, 500, "something went wrong");
                }
            }
        }
    });
}

//get  evaluation by estate
export const GetEvalxState = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {
        if (err) {
            response(res, 401, 401, "Token Error");
        } else {

            try {
                const { status } = req.params;

                const Evaluation = await evaluacion.findAll({ where: { Estado_Eval: status } })

                if (Evaluation) {
                    response(res, 200, 200, Evaluation);
                } else {
                    response(res, 404);
                }

            } catch (err) {

                response(res, 500, 500, "something went wrong");
            }
        }
    });

}

//get  evaluations published by module 
export const GetEvalxModule = async (req, res) => {


    try {
        const { module } = req.params;

        const modulo = await Modulocurso.findByPk(module);

        if(!modulo){
            response(res, 404, 404, "module doesn't exist");
        }else{

            const Evaluation = await evaluacion.findAll({ where: { Id_Mod_Cur_FK: module} })

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

    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {

        if (err) {
            response(res, 500, 105, "Something went wrong");
        }

        try {

            const Id_Eva = uniqid();

            const { Tit_Eva, Des_Eva, Fec_Cer, Id_Module_Cur, Nota_Min_Apro, Intentos_Eval } = req.body;

            const { Id_Rol_FK } = data.user;

            //verify user permissions
            const adminPermiso = adminPermissions(Id_Rol_FK);
            const instpermiso = InstPermissions(Id_Rol_FK);

            if (!adminPermiso && !instpermiso) {

                response(res, 403, 403, "you dont have permissions");
            } else {

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
                        Fec_Cer: Fec_Cer,
                        Id_Mod_Cur_FK: Id_Module_Cur,
                        Not_Min_Apr_Eva: Nota_Min_Apro,
                        Intentos_Eval: Intentos_Eval
                    }

                    const newEvaluation = await evaluacion.create(datos);
                    if (newEvaluation) {
                        response(res, 200);
                    } else {
                        response(res, 500, 500, "error creating category");
                    }
                }

            }

        } catch (err) {

            response(res, 500, 500, err);
        }


    })
}

//update evauations
export const UpdateEvaluations = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, dat) => {
        if (err) {
            response(res, 400, 105, "Something went wrong");
        } else {

            try {
                const { Id_Rol_FK } = dat.user;

                let adPermision = adminPermissions(Id_Rol_FK);
                const instpermiso = InstPermissions(Id_Rol_FK);

                if (adPermision || instpermiso) {

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
                            Fec_Cer: datos.Fec_Cer || dataEval.Fec_Cer,
                            Id_Mod_Cur_FK: datos.Id_Module_Cur || dataEval.Id_Mod_Cur,
                            Not_Min_Apr_Eva: datos.Nota_Min_Apro || dataEval.Nota_Min_Apr,
                            Intentos_Eval: datos.Intentos_Eval || dataEval.Intentos_Eval
                        }

                        const responses = await evaluacion.update(datosEnv, { where: { Id_Eva: id } })
                        if (responses) {
                            response(res, 200);
                        } else {
                            response(res, 500, 500, "error updating category");
                        }


                    }

                } else {
                    response(res, 401, 401, "You don't have permissions");
                }

            } catch (err) {
                response(res, 500, 500, "something went wrong");
            }

        }

    })
}