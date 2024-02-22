import { InstPermissions, adminPermissions } from "../managePermissions/manage.permissions.js"
import uniqid from 'uniqid';
import jsonwebtoken from 'jsonwebtoken';
import 'dotenv/config'
import { response } from "../Resources/responses.js";
import { getAllCourses, getAllCoursesxCat,CoursesUpdate, createNewCourse, verifyExistCurso } from "../models/cursos.model.js";

const jwt = jsonwebtoken;

// get all courses published
export const getCursos = async (req, res) => {

    try {

        //lista de cursos publicados
        getAllCourses(res)
            .then(course => {

                response(res, 200, 200, course);
            })


    } catch (error) {
        response(res, 400, 102, "Something went wrong");
    }


}

// get all courses by category
export const getCuCat = async (req, res) => {

    try {

        const { id } = req.params;
   
        getAllCoursesxCat(res, id)
            .then(category => {
                response(res, 200, 200, category);
            })

    } catch (error) {

        response(res, 400, 102, "Something went wrong");
    }

}

//CREATE A NEW COURSE
export const CreateCourse = async (req, res) => {

    try {

        jwt.verify(req.token, process.env.SECRETWORD, (err, dat) => {
            if (err) {
                response(res, 500, 105, "Something went wrong");
            }

            const { Nom_Cur, Des_Cur, Hor_Cont_Total, Fech_Crea_Cur, Id_Cat_FK, Fot_Cur } = req.body;

            const Id_User = dat.user.Id_User;

            //verify complete data

            if (!Id_User || !Nom_Cur || !Des_Cur || !Hor_Cont_Total || !Fech_Crea_Cur || !Id_Cat_FK || !Fot_Cur) {
                response(res, 400, 102, "Something went wrong");
            } else {

                let Id_Cur = uniqid();

                //verify permissions
                const permisoInst = InstPermissions(dat.user.Id_Rol_FK);
                const permisoAdmin = adminPermissions(dat.user.Id_Rol_FK);

                if (permisoInst || permisoAdmin) {

                    const Est_Cur = 1;

                    const datosCurso = {
                        Id_Cur: Id_Cur,
                        Nom_Cur: Nom_Cur,
                        Des_Cur: Des_Cur,
                        Hor_Cont_Total: Hor_Cont_Total,
                        Fech_Crea_Cur: Fech_Crea_Cur,
                        Id_Cat_FK: Id_Cat_FK,
                        Fot_Cur: Fot_Cur,
                        Est_Cur: Est_Cur
                    }

                    createNewCourse(res, datosCurso)
                        .then(resp => {
                            response(res, 200, 200, resp);
                        })


                } else {
                    response(res, 401, 401, "You don't have permissions");
                }

            }


        });


    } catch (ex) {

        response(res, 400, 102, "Something went wrong");
    }
}

//UPDATE COURSE
export const UpdateCourse = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, dat) => {
        if (err) {
            response(res, 500, 105, "Something went wrong");
        }

        let { user } = jwt.decode(req.token, process.env.SECRETWORD);

        let adPermision = adminPermissions(user.Id_Rol_FK);
        let InsPermission = InstPermissions(user.Id_Rol_FK);


        if (adPermision || InsPermission) {

            //Data
            try {

                const { id } = req.params;
                const InfoCur = req.body;

                //verify exist user

                let objDatos;

                verifyExistCurso(res,id)
                    .then(curso => {

                        objDatos = {
                            id:id,
                            Nom_Cur: InfoCur.Nom_Cur || curso.Nom_Cur,
                            Des_Cur: InfoCur.Des_Cur || curso.Des_Cur,
                            Hor_Cont_Total: InfoCur.Hor_Cont_Total || curso.Hor_Cont_Total,
                            Fech_Crea_Cur: InfoCur.Fech_Crea_Cur || curso.Fech_Crea_Cur,
                            Id_Cat_FK: InfoCur.Id_Cat_FK || curso.Id_Cat_FK,
                            Fot_Cur: InfoCur.Fot_Cur || curso.Fot_Cur
                        }

                        CoursesUpdate(res, objDatos)
                        .then(resp=>{
                            response(res, 200, 200, resp);
                        })
                    })

            } catch (ex) {
                response(res, 400, 102, "Something went wrong");
            }

        } else {
            response(res, 401, 401, "You don't have permissions");
        }



    })
}

