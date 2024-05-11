import 'dotenv/config'
import uniqid from 'uniqid';
import { response } from "../utils/responses.js";
import { Objetivos_Cursos } from "../models/objetivos_cursos.model.js";
import { Cursos } from "../models/cursos.model.js";


//get objetive by course id
export const GetAllObjxCourse = async (req, res) => {

    try {
        const { id } = req.params;

        const courses = await Objetivos_Cursos.findOne({ where: { Id_Cur_FK: id } })

        if (courses) {
            response(res, 200, 200, courses);
        } else {
            response(res, 404, 404, 'Not Found');
        }

    } catch (err) {
        response(res, 500, 500, err);
    }

}

// create COURSE objetives
export const createObjCour = async (req, res) => {

    try {

        const Id_Objetivo = uniqid();

        const { Desc_Objetivo, Id_Cur } = req.body;

        //verificamos que exista el curso
        const courseExist = await Cursos.findByPk(Id_Cur);

        if (!courseExist) {

            response(res, 404, 404, "course not found");
        } else {

            //create objetive
            const datos = {
                Id_Objetivo: Id_Objetivo,
                Desc_Objetivo: Desc_Objetivo.toLowerCase(),
                Id_Cur_FK: Id_Cur
            }

            const newObjetive = await Objetivos_Cursos.create(datos);
            if (newObjetive) {
                response(res, 200);
            } else {

                response(res, 500, 500, "error creating objetive");
            }

        }

    } catch (err) {

        response(res, 500, 500, 'Something went wrong');
    }
}

//update categorias
export const UpdateObjetivesCour = async (req, res) => {

    try {
        //Data
        const { id } = req.params;
        const datosRec = req.body;
        let datos;

        //verify objetive exist

        let objetive = await Objetivos_Cursos.findByPk(id)

        if (!objetive) {

            response(res, 404, 404, "Objetive not found");

        } else {
            objetive = objetive.dataValues;


            if (datosRec.Id_Cur) {

                let course = await Cursos.findByPk(datosRec.Id_Cur);

                if (course) {
                    course = course.dataValues;

                    datos = {
                        Desc_Objetivo: datosRec.Desc_Objetivo || objetive.Desc_Objetivo,
                        Id_Cur_FK: datosRec.Id_Cur
                    }


                } else {

                    datos = {
                        Desc_Objetivo: datosRec.Desc_Objetivo,
                        Id_Cur_FK: datosRec.Id_Cur || objetive.Id_Cur_FK
                    }

                }


                const responses = await Objetivos_Cursos.update(datos, { where: { Id_Objetivo: id } })
                if (responses) {
                    response(res, 200);
                } else {
                    response(res, 500, 500, "Error updating objetive");
                }

            } else {
                response(res, 404, 404, "course don't exist");
            }
        }


    } catch (err) {
        response(res, 500, 500, "something went wrong");
    }
}

/*
//delete categories
export const DeleteCategories = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, datos) => {
        if (err) {

            response(res, 400, 105, "Something went wrong");
        }

        try {

            const { id } = req.params;
            const { Id_Rol_FK } = datos.user;

            const permiso = adminPermissions(Id_Rol_FK);

            if (!permiso) {
                response(res, 401, 401, "You don't have permissions");
            }

            //verify category exist

            const category = await GetCatxId(res, id)

            if (category.length > 0) {

                const responses = await deleteCat(res, id)

                if (responses) {
                    response(res, 200, 200, "Success deleted");
                }


            } else {
                response(res, 200, 204, category);
            }



        } catch (err) {

            if (err.errno) {

                response(res, 500, 500, "something went wrong");

            } else {

                response(res, 400, err.errno, err.code);
            }

        }

    })
}*/
