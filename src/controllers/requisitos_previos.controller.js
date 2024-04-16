import jsonwebtoken from "jsonwebtoken"
import { adminPermissions, InstPermissions } from "../utils/manage.permissions.js";
import 'dotenv/config'
import uniqid from 'uniqid';
import { response } from "../utils/responses.js";
import { Requisitos_previo } from "../models/requisitos_previos.model.js";
import { Cursos } from "../models/cursos.model.js";

const jwt = jsonwebtoken;

//get  Requirements by id
export const GetReqxCurso = async (req, res) => {

    try {
        const { id } = req.params;

        const curso = await Cursos.findByPk(id)

        if (curso) {
            const requisitos = await Requisitos_previo.findAll({ where: { Id_Cur_FK: id } })
            if(requisitos) {
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

    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {

        if (err) {
            response(res, 401, 401, "TOKEN ERROR");
        }

        try {

            const Id_Req = uniqid();

            const { Desc_Req , Id_Cur} = req.body;

            const { Id_Rol_FK } = data.user;

            //verify user permissions
            const adminPermiso = adminPermissions(Id_Rol_FK);
            const instper = InstPermissions(Id_Rol_FK);

            if (!adminPermiso && !instper) {

                response(res, 403, 403, "you dont have permissions");
            } else {

                //verificamos que exista el curso
                const curso = await Cursos.findByPk(Id_Cur)
                
                if (!curso) {

                    response(res, 404, 404, "course not found");

                } else {

                    //create req
                    const datos = {
                        Id_Req: Id_Req,
                        Desc_Req: Desc_Req,
                        Id_Cur_FK: Id_Cur.toLowerCase()
                    }

                    const newReq = await Requisitos_previo.create(datos);
                    if (newReq) {
                        response(res, 200);
                    } else {
                        response(res, 500, 500, "error creating requirement");
                    }

                }
            }
        } catch (err) {

            response(res, 500, 500, "something went wrong");
        }


    })
}

//update categorias
export const UpdateReq = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, dat) => {
        if (err) {
            response(res, 401, 401, "TOKEN ERROR");
        } else {

            try {
                const { Id_Rol_FK } = dat.user;

                let adPermision = adminPermissions(Id_Rol_FK);
                let instPermiso = InstPermissions(Id_Rol_FK);

                if (adPermision  || instPermiso) {

                    //Data
                    const { id } = req.params;
                    const datos = req.body;

                    //verify exist category

                    let requisito= await Requisitos_previo.findByPk(id)

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

                } else {
                    response(res, 401, 401, "You don't have permissions");
                }

            } catch (err) {
                response(res, 500, 500, "something went wrong");
            }

        }

    })
}

