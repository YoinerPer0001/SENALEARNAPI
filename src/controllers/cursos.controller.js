import uniqid from 'uniqid';
import jsonwebtoken from 'jsonwebtoken';
import 'dotenv/config'
import { response } from "../utils/responses.js";
import { Cursos } from "../models/cursos.model.js";
import { Categorias } from "../models/categorias.model.js"
import { Usuario } from "../models/users.model.js";

const jwt = jsonwebtoken;

const atrInst = ['Id_User', 'Nom_User', 'Ape_User', 'Ema_User', 'Fot_User'];

const objInclude = [
    { model: Usuario, as: 'Instructor', attributes: atrInst },
    { model: Categorias, as: 'Categoria', attributes: ['Id_Cat', 'Nom_Cat'] }
]

// get all courses published
export const getCursos = async (req, res) => {

    try {

        //lista de cursos publicados
        const courses = await Cursos.findAll({
            where: { Est_Cur: 2 },
            include: objInclude
        })

        if (courses) {
            response(res, 200, 200, courses);
        } else {
            response(res, 404, 404, 'Courses not found');
        }

    } catch (err) {
        response(res, 500, 500, err);
    }


}

// get all courses by category
export const getCuCat = async (req, res) => {

    try {

        const { id } = req.params;

        const course = await Cursos.findOne({ where: { Id_Cat_FK: id, Est_Cur: 2 }, include: objInclude })

        if (course) {
            response(res, 200, 200, course);
        } else {
            response(res, 404, 404, 'Courses not found');
        }


    } catch (err) {

        response(res, 500, 500, err);
    }

}

// get course by id
export const getCursoId = async (req, res) => {

    try {

        const { id } = req.params;

        const course = await Cursos.findOne({ where: { Id_Cur: id }, include: objInclude })

        if (course) {
            response(res, 200, 200, course);
        } else {
            response(res, 404, 404, 'Course not found');
        }


    } catch (err) {

        response(res, 500, 500, "something went wrong");
    }

}


//CREATE A NEW COURSE
export const CreateCourse = async (req, res) => {

    try {

        const { Nom_Cur, Des_Cur, Id_Cat_FK } = req.body;

        const { Id_User } = req.Tokendata.user;

<<<<<<< HEAD
        let Id_Cur = uniqid();
=======
                const { Nom_Cur, Des_Cur, Id_Cat_FK } = req.body;
>>>>>>> cddbb888a0996a8409ee2987042866331bff0547

        //verify that category exists
        const category = await Categorias.findByPk(Id_Cat_FK);
        if (category) {

            const Est_Cur = 1;

<<<<<<< HEAD
            const datosCurso = {
                Id_Cur: Id_Cur,
                Nom_Cur: Nom_Cur,
                Des_Cur: Des_Cur,
                Fech_Crea_Cur: Date.now(),
                Id_Cat_FK: Id_Cat_FK,
                Id_Inst: Id_User,
                Est_Cur: Est_Cur
=======
                let Id_Cur = uniqid();

                //verify permissions
                const permisoInst = InstPermissions(Id_Rol_FK);
                const permisoAdmin = adminPermissions(Id_Rol_FK);

                if (permisoInst || permisoAdmin) {

                    //verify that category exists
                    const category = await Categorias.findByPk(Id_Cat_FK);
                    if (category) {

                        const Est_Cur = 1;

                        const datosCurso = {
                            Id_Cur: Id_Cur,
                            Nom_Cur: Nom_Cur,
                            Des_Cur: Des_Cur,
                            Hor_Cont_Total: Hor_Cont_Total,
                            Fech_Crea_Cur: Date.now(),
                            Id_Cat_FK: Id_Cat_FK,
                            Fot_Cur: Fot_Cur,
                            Id_Inst: Id_User,
                            Est_Cur: Est_Cur
                        }

                        const resp = await Cursos.create(datosCurso);

                        if (resp) {
                            response(res, 200);
                        } else {
                            response(res, 500, 500, "error creating course");
                        }

                    } else {
                        response(res, 404, 404, "Category not found");
                    }
                } else {
                    response(res, 401, 401, "You don't have permissions");
                }

>>>>>>> cddbb888a0996a8409ee2987042866331bff0547
            }

            const resp = await Cursos.create(datosCurso);

            if (resp) {
                response(res, 200);
            } else {
                response(res, 500, 500, "error creating course");
            }

        } else {
            response(res, 404, 404, "Category not found");
        }


    } catch (err) {

        response(res, 500, 500, "something went wrong");
    }
}

//UPDATE COURSE
export const UpdateCourse = async (req, res) => {

    //Data
    try {

        const { id } = req.params;
        const InfoCur = req.body;

        //verify exist user

        let objDatos;

        const curso = await Cursos.findByPk(id);

        if (curso) {

            objDatos = {
                Nom_Cur: InfoCur.Nom_Cur || curso.Nom_Cur,
                Des_Cur: InfoCur.Des_Cur || curso.Des_Cur,
                Hor_Cont_Total: InfoCur.Hor_Cont_Total || curso.Hor_Cont_Total,
                Fech_Crea_Cur: InfoCur.Fech_Crea_Cur || curso.Fech_Crea_Cur,
                Id_Cat_FK: InfoCur.Id_Cat_FK || curso.Id_Cat_FK,
                Fot_Cur: InfoCur.Fot_Cur || curso.Fot_Cur
            }

            const resp = await Cursos.update(objDatos, { where: { Id_Cur: id } })
            if (resp) {
                response(res, 200);
            } else {
                response(res, 500, 500, "error updating course");
            }
        } else {
            response(res, 404, 404, "Course not found");
        }

    } catch (err) {

        response(res, 500, 500, "something went wrong");
    }
}


