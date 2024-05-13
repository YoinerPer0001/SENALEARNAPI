import 'dotenv/config'
import uniqid from 'uniqid';
import { response } from "../utils/responses.js";
import { Contenido_Modulos } from "../models/contenido_modulo.model.js";
import { Modulocurso } from '../models/modulos_cursos.model.js'
import { Cursos } from "../models/cursos.model.js";
import { sequelize } from "../database/db.js";



//get module content by id module
export const GetContModuloxModule = async (req, res) => {

    try {
        const { id } = req.params;

        const modules = await Modulocurso.findByPk(id)

        if (modules) {
            const content = await Contenido_Modulos.findOne({ where: { Id_Mod_FK: id } })
            if (content) {
                response(res, 200, 200, content)
            } else {
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

    try {

        const Id_Cont = uniqid();

        const { Tip_Cont, Url_Cont, Tit_Cont, Id_Mod_FK } = req.body;

        let moduleCourseExist = await Modulocurso.findByPk(Id_Mod_FK);

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
                //verificamos el porcentaje del modulo y lo dividimos entre la cantidad de contenido del modulo
                const { Porcentaje_Asig } = await Modulocurso.findByPk(Id_Mod_FK)
                const contenidoTotal = await Contenido_Modulos.findAll({ where: { Id_Mod_FK: Id_Mod_FK } })
                const porcentaje = (Porcentaje_Asig / contenidoTotal.length);
                console.log(Porcentaje_Asig)

                const updatePor = await Contenido_Modulos.update({ Porcentaje_Asig: porcentaje }, { where: { Id_Mod_FK: Id_Mod_FK } })
                response(res, 200);
            } else {
                response(res, 500, 500, "error creating content module");
            }

        } else {
            response(res, 400, 103, "module don't exist");
        }



    } catch (err) {

        response(res, 500, 500, err);

    }
}


//update mod cursos
export const UpdateModCur = async (req, res) => {

    try {

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


            const responses = await Contenido_Modulos.update(datos, { where: { Id_Cont: id } })
            if (responses) {
                response(res, 200);
            } else {
                response(res, 500, 500, "error updating content module");
            }

        }


    } catch (err) {

        response(res, 500, 500, err);
    }
}

//delete cont module
// export const deleteCat = async (req, res) => {
//     try{

//         const {id} = req.params

//         const category = await Categorias.findByPk(id)
//         if(category){
//         //verify that category dont have courses asociated
//         const courses = await Cursos.findAll({where:{Id_Cat_FK: id}})
//             console.log(courses)
//         if(courses.length > 0){
//             response(res, 409, 409, "category have courses asociated");
//         }else{
//             const responses = await Categorias.update({ESTADO_REGISTRO: 0},{where:{Id_Cat: id}})
//             if(responses){
//                 response(res, 200);
//             }else{
//                 response(res, 500, 500, "error deleting category");
//             }
//         }

//         }else{
//             response(res, 404, 404, "Category not found");
//         }

//     }catch (err) {
//         response(res, 500, 500, err);
//     }
// }


