import jsonwebtoken from "jsonwebtoken"
import { adminPermissions, InstPermissions } from "../utils/manage.permissions.js";
import 'dotenv/config'
import uniqid from 'uniqid';
import { response } from "../utils/responses.js";
import { Contenido_Modulos } from "../models/contenido_modulo.model.js";
import { Modulocurso } from '../models/modulos_cursos.model.js'

const jwt = jsonwebtoken;


//get module content by id module
export const GetContModuloxModule = async (req, res) => {

    try {
        const { id } = req.params;

        const modules = await Modulocurso.findByPk(id)

        if (modules) {
            const content = await Contenido_Modulos.findOne({where:{Id_Mod_FK:id}})
            if (content) {
                response(res, 200, 200, content)
            }else{
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

    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {

        if (err) {
            response(res, 401, 401, 'token not valid');
        } else {


            try {

                const Id_Cont = uniqid();

                const { Tip_Cont, Url_Cont, Tit_Cont, Id_Mod_FK } = req.body;

                const { Id_Rol_FK } = data.user;
                //verify user permissions
                const adminPermiso = adminPermissions(Id_Rol_FK);
                const InstPermiso = InstPermissions(Id_Rol_FK);

                //verify exist module course
                if (!adminPermiso && !InstPermiso) {

                    response(res, 403, 403, "you dont have permissions");
                } else {

                    const moduleCourseExist = await Modulocurso.findByPk(Id_Mod_FK);

                    if (moduleCourseExist) {

                        //create category
                        const datos = {
                            Id_Cont: Id_Cont,
                            Tip_Cont: Tip_Cont,
                            Url_Cont: Url_Cont,
                            Tit_Cont: Tit_Cont,
                            Id_Mod_FK: Id_Mod_FK
                        }

                        const newModule = await Contenido_Modulos.create(datos);
                        if (newModule) {
                            response(res, 200);
                        } else {
                            response(res, 500, 500, "error creating content module");
                        }

                    } else {
                        response(res, 400, 103, "module don't exist");
                    }

                }

            } catch (err) {

                response(res, 500, 500, "something went wrong");

            }
        }


    })
}

// //update mod cursos
export const UpdateModCur = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, dat) => {
        if (err) {
            response(res, 401, 401, "Token not valid");
        } else {

            try {
                const { Id_Rol_FK } = dat.user;

                let adPermision = adminPermissions(Id_Rol_FK);
                let InstPermiso = InstPermissions(Id_Rol_FK);

                if (adPermision || InstPermiso) {

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
                                Id_Mod_FK: cont_mod.Id_Mod_FK

                            }

                        }


                        const responses = await Contenido_Modulos.update(datos, {where:{Id_Cont: id }})
                        if(responses){
                            response(res, 200);
                        }else{
                            response(res, 500, 500, "error updating content module");
                        }

                    }

                } else {

                    response(res, 403, 403, "You don't have permissions");
                }

            } catch (err) {

                response(res, 500, 500, err);
            }
        }



    })
}

