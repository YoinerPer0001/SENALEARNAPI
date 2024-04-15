import { Inscripcione } from '../models/inscripciones.model.js'
import { response } from '../utils/responses.js';
import { adminPermissions, InstPermissions, UserPermissions } from '../utils/manage.permissions.js';
import { Usuario } from '../models/users.model.js'
import { Cursos } from '../models/cursos.model.js'
import jsonwebtoken from 'jsonwebtoken';

const jwt = jsonwebtoken;

//obtener toda la lista de inscripciones
export const getAllInsc = async (req, res) => {
    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {
        try {
            if (err) {
                response(res, 401, 401, "Token Error");

            } else {

                const { Id_Rol_FK } = data.user;
                const adminper = adminPermissions(Id_Rol_FK);
                if (!adminper) {
                    response(res, 403, 403, "you don't have permissions");
                } else {

                    const insc = await Inscripcione.findAll({
                        attributes: { exclude: ['createdAt', 'updatedAt'] },
                        include: [{
                            model: Usuario,
                            as: 'Usuario',
                            attributes: { exclude: ['Id_User', 'Pass_User', 'Est_Email_User', 'createdAt', 'updatedAt'] },
                        },
                        {
                            model: Cursos,
                            as: 'Curso',
                            attributes: { exclude: ['Id_Cur', 'createdAt', 'updatedAt'] }
                        }]
                    });
                    if (insc) {
                        response(res, 200, 200, insc);
                    } else {
                        response(res, 404, 404, 'inscriptions not found');
                    }
                }
            }
        } catch (err) {

            response(res, 500, 500, err);
        }
    })


}

//obtener toda la lista de cursos a los que se encuentra inscrito un usuario
export const getInscxUser = async (req, res) => {
    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {
        try {
            if (err) {
                response(res, 401, 401, "Token Error");

            } else {

                const { Id_Rol_FK } = data.user;

                const { id } = req.params;


                //verify that the user exists
                const user = await Usuario.findByPk(id);

                if (user) {

                    const insc = await Inscripcione.findAll({
                        attributes: { exclude: ['createdAt', 'updatedAt'] },
                        include: [{
                            model: Usuario,
                            as: 'Usuario',
                            attributes: { exclude: ['Id_User', 'Pass_User', 'Est_Email_User', 'createdAt', 'updatedAt'] },
                        },
                        {
                            model: Cursos,
                            as: 'Curso',
                            attributes: { exclude: ['Id_Cur', 'createdAt', 'updatedAt'] }
                        }],
                        where: { Id_User_FK: id }
                    });
                    if (insc) {
                        response(res, 200, 200, insc);
                    } else {
                        response(res, 404, 404, 'inscriptions not found');
                    }

                } else {
                    response(res, 400, 102, "user is required");
                }

            }
        } catch (err) {

            response(res, 500, 500, "something went wrong");
        }
    })


}

//obtener toda la lista de usuarios inscritos en un curso
export const getInscxCurso = async (req, res) => {
    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {
        try {
            if (err) {
                response(res, 404, 404, "Token Error");

            } else {

                const { Id_Rol_FK } = data.user;
                const adminper = adminPermissions(Id_Rol_FK);
                const instPer = InstPermissions(Id_Rol_FK);
                if (adminper || instPer) {
                    const { id } = req.params;

                    //verify that the course exists
                    const course = await Cursos.findByPk(id);
                    if (course) {
                        const insc = await Inscripcione.findAll({
                            attributes: { exclude: ['createdAt', 'updatedAt'] },
                            include: [{
                                model: Usuario,
                                as: 'Usuario',
                                attributes: { exclude: ['Id_User', 'Pass_User', 'Est_Email_User', 'createdAt', 'updatedAt'] },
                            },
                            {
                                model: Cursos,
                                as: 'Curso',
                                attributes: { exclude: ['Id_Cur', 'createdAt', 'updatedAt'] }
                            }],
                            where: { Id_Cur_FK: id  }
                        });
                        
                        if (insc) {
                            response(res, 200, 200, insc);
                        } else {
                            response(res, 404, 404, 'inscriptions not found');
                        }
                    } else {
                        response(res, 404, 404, "course not found");
                    }

                } else {
                    response(res, 403, 403, "you don't have permissions");
                }


            }
        } catch (err) {

            response(res, 500, 500, "something went wrong");

        }
    })


}

// Realizar inscripciones
export const newInsciption = (req, res) => {
    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {
        try {
            if (err) {
                response(res, 401, 401, "Token Error");

            } else {

                const { Id_User, Id_Cur } = req.body;

                //verificar que exista el usuario
                const user = await Usuario.findByPk(Id_User);

                //verificar que exista el curso
                const curso = await Cursos.findByPk(Id_Cur);

                //verificar que inscripcion no exista
                const insc = await Inscripcione.findOne({ where: { Id_User_FK: Id_User, Id_Cur_FK: Id_Cur } });

                if (user && curso && !insc) {
                    const datos = {
                        Id_User_FK: Id_User,
                        Id_Cur_FK: Id_Cur,
                        Prog_Cur: 0,
                    }

                    //INSCRIBIMOS
                    const responses = await Inscripcione.create(datos);
                    if (responses) {
                        response(res, 200);
                    } else {
                        response(res, 500, 500, "Error creating Inscription");
                    }


                } else {
                    if (insc) {
                        response(res, 404, 103, "user already inscrited in this course");
                    } else {
                        response(res, 404, 404, "user or course not found");
                    }
                }

            }

        } catch (err) {
            response(res, 500, 500, err);
        }
    })
}

//edit inscriptions
export const editInsciption = (req, res) => {
    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {
        try {
            if (err) {
                response(res, 401, 401, "Something went wrong");
            } else {
                //verify permissions
                const { Id_Rol_FK } = data.user;

                const adminper = adminPermissions(Id_Rol_FK);
                if (!adminper) {
                    response(res, 403, 403, "you don't have permissions");

                } else {
                    //const { Id_User, Id_Cur, fecha_insc } = req.body;
                    const { id } = req.params;
                    const datos = req.body



                    //verify that the inscription exists
                    let insc = await Inscripcione.findOne({ where: { Id_User_FK: id, Id_Cur_FK: datos.Id_Cur } });

                    if (!insc) {
                        response(res, 404, 404, "inscription don't exist");

                    } else {

                        insc = insc.dataValues;
                        let data;

                        //if wants update the course
                        if (datos.Id_Cur_New) {

                            //we verify that the new course exists
                            const curso = await Cursos.findByPk(datos.Id_Cur_New);

                            if (!curso) {
                                response(res, 404, 404, "course don't exist");

                            } else {

                                
                                //we verify that the new inscription isn't already exists

                                const NewinscxCurso = await Inscripcione.findOne({ where: { Id_User_FK: id, Id_Cur_FK: datos.Id_Cur_New } });

                                if (NewinscxCurso) {
                                    response(res, 409, 409, "course already inscrited");
                                } else {

                                    data = {

                                        Id_Cur_FK: datos.Id_Cur_New || insc.Id_Cur,
                                        Prog_Cur: datos.Prog_Cur || insc.Prog_Cur,
                                        fecha_insc: datos.fecha_insc || insc.fecha_insc
                                    }

                                }
                            }
                        } else {
                            data = {
                                Prog_Cur: datos.Prog_Cur || insc.Prog_Cur,
                                fecha_insc: datos.fecha_insc || insc.fecha_insc
                            }
                        }

                        //edit the inscription
                        const editedInsc = await Inscripcione.update(data, { where: { Id_User_FK: id, Id_Cur_FK: datos.Id_Cur } });

                        if (editedInsc) {

                            response(res, 200);
                        } else {

                            response(res, 500, 500, "Error editing inscription");
                        }


                    }

                }

            }
        } catch (err) {
            response(res, 500, 500, "something went wrong");

        }
    })
}

