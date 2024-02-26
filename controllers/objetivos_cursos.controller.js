import jsonwebtoken from "jsonwebtoken"
import { adminPermissions, InstPermissions } from "../managePermissions/manage.permissions.js";
import 'dotenv/config'
import uniqid from 'uniqid';
import { response } from "../Resources/responses.js";
import { GetObjxCourses, CreateObjCourse, GetObjxId, UpdateObjCourses } from "../models/objetivos_cursos.model.js";
import { getCoursesxId } from "../models/cursos.model.js";

const jwt = jsonwebtoken;


//get  category by id
export const GetAllObjxCourse = async (req, res) => {

    try {
        const { id } = req.params;

        if (id) {

            const courses = await GetObjxCourses(id)

            response(res, 200, 200, courses);

        } else {
            response(res, 400, 102, "Something went wrong");
        }

    } catch (err) {
        if (err.errno) {

            response(res, 500, 500, "something went wrong");

        } else {

            response(res, 400, err.errno, err.code);
        }
    }

}


// create COURSE objetives
export const createObjCour = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {

        if (err) {

            response(res, 500, 105, "Something went wrong");
        }

        try {

            const Id_Objetivo = uniqid();


            const { Desc_Objetivo, Id_Cur } = req.body;

            //verify user permissions
            const adminPermiso = adminPermissions(data.user.Id_Rol_FK);

            if (!adminPermiso) {
                response(res, 403, 403, "you dont have permissions");

            } else {

                //verificamos que exista el curso
                const courseExist = await getCoursesxId(Id_Cur);

                if (courseExist.length < 1) {

                    response(res, 404, 404, "course not found");
                } else {
                    //verificamos que no exista una un objetivo con el mismo id
                    const objetivoExists = await GetObjxId( Id_Objetivo)


                    if (objetivoExists.length > 0) {

                        response(res, 500, 107, "objetive already exist");

                    } else {

                        //create objetive
                        const datos = {
                            Id_Objetivo: Id_Objetivo,
                            Desc_Objetivo: Desc_Objetivo.toLowerCase(),
                            Id_Cur_FK: Id_Cur
                        }

                        const newObjetive = await CreateObjCourse( datos);

                        response(res, 200, 200, "success created");

                    }

                }


            }

        } catch (err) {

            if (err.errno) {

                response(res, 500, 500, "something went wrong");

            } else {

                response(res, 400, err.errno, err.code);
            }


        }


    })
}

//update categorias
export const UpdateObjetivesCour = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, dat) => {
        if (err) {
            response(res, 400, 105, "Something went wrong");
        }

        try {
            const { Id_Rol_FK } = dat.user;

            let adPermision = adminPermissions(Id_Rol_FK);
            let instPermiso = InstPermissions(Id_Rol_FK);

            if (adPermision || instPermiso) {

                //Data
                const { id } = req.params;
                const { Desc_Objetivo, Id_Cur } = req.body;

                //verify objetive exist

                const objetive = await GetObjxId(id)

                if (objetive.length < 1) {

                    response(res, 500, 103, "Something went wrong");

                } else {

                    //verify course exist
                    const course = await getCoursesxId(Id_Cur);
                   
                    if (course.length > 0) {
                        const datos = {
                            Id_Objetivo: id,
                            Desc_Objetivo: Desc_Objetivo,
                            Id_Cur_FK: Id_Cur
                        }
                       
                        const responses = await UpdateObjCourses(datos)
                        const objResp ={
                            affectedRows: responses.affectedRows
                        }
                        response(res, 200, 200, objResp);
                    }else{
                        response(res, 204, 204, "course don't exist");
                    }
                }

            } else {
                response(res, 401, 401, "You don't have permissions");
            }

        } catch (err) {

            if (err.errno) {
                response(res, 400, err.errno, err.code);

            } else {

                response(res, 500, 500, "something went wrong");
            }
        }



    })
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
