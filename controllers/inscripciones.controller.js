import { getAllIns, getInscxUserxCurso, InsertInscriptions, updateInscription, deleteInscription, getAllInscxUserId, getAllInscxCurso } from '../models/inscripciones.model.js'
import { response } from '../Resources/responses.js';
import { adminPermissions, InstPermissions, UserPermissions } from '../managePermissions/manage.permissions.js';
import { GetUserbyId } from '../models/users.model.js'
import { getCoursesxId } from '../models/cursos.model.js'
import jsonwebtoken from 'jsonwebtoken';

const jwt = jsonwebtoken;

//obtener toda la lista de inscripciones
export const getAllInsc = async (req, res) => {
    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {
        try {
            if (err) {
                response(res, 500, 105, "Something went wrong");

            } else {

                const { Id_Rol_FK } = data.user;
                const adminper = adminPermissions(Id_Rol_FK);
                if (!adminper) {
                    response(res, 403, 403, "you don't have permissions");
                } else {

                    const insc = await getAllIns();
                    if (insc.length > 0) {
                        response(res, 200, 200, insc);
                    } else {
                        response(res, 204, 204, insc);
                    }
                }
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

//obtener toda la lista de cursos a los que se encuentra inscrito un usuario
export const getInscxUser = async (req, res) => {
    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {
        try {
            if (err) {
                response(res, 500, 105, "Something went wrong");

            } else {

                const { Id_Rol_FK } = data.user;
                const adminper = adminPermissions(Id_Rol_FK);
                const userper = UserPermissions(Id_Rol_FK);

                if (adminper || userper) {

                    const { id } = req.params;


                    //verify that the user exists
                    const user = await GetUserbyId(id);
                    
                    if (user.length > 0) {
                        const insc = await getAllInscxUserId(id);
                        if (insc.length > 0) {
                            response(res, 200, 200, insc);
                        } else {
                            response(res, 204, 204, insc);
                        }


                    } else {
                        response(res, 400, 102, "user is required");
                    }

                } else {
                    response(res, 403, 403, "you don't have permissions");

                }


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

//obtener toda la lista de usuarios inscritos en un curso
export const getInscxCurso = async (req, res) => {
    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {
        try {
            if (err) {
                response(res, 500, 105, "Something went wrong");

            } else {

                const { Id_Rol_FK } = data.user;
                const adminper = adminPermissions(Id_Rol_FK);
                const instPer = InstPermissions(Id_Rol_FK);
                if (adminper || instPer) {
                    const { id } = req.params;

                    if (id) {
                        //verify that the course exists
                        const course = await getCoursesxId(id);
                        if (course) {
                            const insc = await getAllInscxCurso(id);
                            if (insc.length > 0) {
                                response(res, 200, 200, insc);
                            } else {
                                response(res, 204, 204, insc);
                            }
                        } else {
                            response(res, 400, 102, "course don't exist");
                        }

                    } else {
                        response(res, 400, 102, "course is required");
                    }
                } else {
                    response(res, 403, 403, "you don't have permissions");
                }


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

// Realizar inscripciones
export const newInsciption = (req, res) => {
    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {
        try {
            if (err) {
                response(res, 500, 105, "Something went wrong");

            } else {

                const { Id_User, Id_Cur, fecha_insc } = req.body;
                if (!Id_User || !Id_Cur || !fecha_insc) {
                    response(res, 400, 102, "Something went wrong");
                } else {
                    //verificar que exista el usuario
                    const user = await GetUserbyId(Id_User);

                    //verificar que exista el curso
                    const curso = await getCoursesxId(Id_Cur);

                    //verificar que inscripcion no exista
                    const insc = await getInscxUserxCurso(Id_User, Id_Cur);

                    if (user.length > 0 && curso.length > 0 && insc.length < 1) {
                        const datos = {
                            Id_User_FK: Id_User,
                            Id_Cur_FK: Id_Cur,
                            Prog_Cur: '0%',
                            fecha_insc: fecha_insc
                        }


                        //INSCRIBIMOS
                        const responses = await InsertInscriptions(datos);
                        const objResp = {
                            affectedRows: responses.affectedRows
                        }
                        response(res, 200, 200, objResp);

                    } else {
                        if (insc.length > 0) {
                            response(res, 404, 103, "user already inscrited in this course");
                        } else {
                            response(res, 404, 404, "user or course not found");
                        }
                    }

                }


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

//edit inscriptions
export const editInsciption = (req, res) => {
    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {
        try {
            if (err) {
                response(res, 500, 105, "Something went wrong");
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

                    if (!id) {
                        response(res, 400, 102, "Id user is required");
                    } else {

                        //verify that the inscription exists
                        const insc = await getInscxUserxCurso(id, datos.Id_Cur);
                        if (insc.length < 1) {
                            response(res, 400, 103, "inscription don't exist");

                        } else {
                            //if wants update the course
                            if (datos.Id_Cur_New) {

                                //we verify that the new course exists
                                const curso = await getCoursesxId(datos.Id_Cur_New);

                                if (curso.length < 1) {
                                    response(res, 400, 103, "course don't exist");

                                } else {

                                    //we verify that the new inscription isn't already exists

                                    const NewinscxCurso = await getInscxUserxCurso(id, datos.Id_Cur_New);
                                    if (NewinscxCurso.length > 0) {
                                        response(res, 400, 103, "course already inscrited");
                                    } else {

                                        const data = {
                                            Id_User_FK: id,
                                            Id_Cur_FK: datos.Id_Cur,
                                            Prog_Cur: datos.Prog_Cur || insc[0].Prog_Cur,
                                            fecha_insc: datos.fecha_insc || insc[0].fecha_insc
                                        }

                                        //edit the inscription
                                        const editedInsc = await updateInscription(data, datos.Id_Cur_New);
                                        const objResp = {
                                            affectedRows: editedInsc.affectedRows
                                        }

                                        response(res, 200, 200, objResp);
                                    }
                                }
                            } else {
                                const data = {
                                    Id_User_FK: id,
                                    Id_Cur_FK: datos.Id_Cur,
                                    Prog_Cur: datos.Prog_Cur || insc[0].Prog_Cur,
                                    fecha_insc: datos.fecha_insc || insc[0].fecha_insc
                                }

                                //edit the inscription
                                const editedInsc = await updateInscription(data);
                                const objResp = {
                                    affectedRows: editedInsc.affectedRows
                                }

                                response(res, 200, 200, objResp);
                            }


                        }
                    }
                }

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

//edit inscriptions
export const deleteInsciption = (req, res) => {
    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {
        try {
            if (err) {
                response(res, 500, 105, "Something went wrong");
            } else {
                //verify permissions
                const { Id_Rol_FK } = data.user;
                const adminper = adminPermissions(Id_Rol_FK);
                if (!adminper) {
                    response(res, 403, 403, "you don't have permissions");

                } else {
                    const { id_User, id_Curso } = req.params;

                    if (!id_User || !id_Curso) {
                        response(res, 400, 102, "Id user and Id Course is required");
                    } else {
                        //verify that the inscription exists
                        const insc = await getInscxUserxCurso(id_User, id_Curso);
                        if (insc.length < 1) {
                            response(res, 400, 103, "inscription don't exist");

                        } else {
                            const data = {
                                Id_User_FK: id_User,
                                Id_Cur_FK: id_Curso
                            }
                            //delete the inscription
                            const deletedInsc = await deleteInscription(data);
                            const objResp = {
                                affectedRows: deletedInsc.affectedRows
                            }
                            response(res, 200, 200, objResp);
                        }

                    }
                }
            }
        } catch (e) {

            if (e.errno) {
                response(res, 400, e.errno, e.code);
            } else {
                response(res, 500, 500, "something went wrong");
            }
        }
    });
}


