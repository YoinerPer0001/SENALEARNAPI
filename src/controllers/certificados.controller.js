import { Certificado } from '../models/cerificados.model.js';
import { response } from '../utils/responses.js';
import { Usuario } from '../models/users.model.js'
import { Cursos } from '../models/cursos.model.js'
import 'dotenv/config'
import { Inscripcione } from '../models/inscripciones.model.js';

//get all certificates
export const getAllCertificates = async (req, res) => {
    try {
        const cert = await Certificado.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [{
                model: Usuario,
                as: 'Usuario',
                attributes: { exclude: ['Pass_User', 'Est_Email_User', 'createdAt', 'updatedAt'] },
            },
            {
                model: Cursos,
                as: 'Curso',
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            }
            ]
        });
        if (cert) {
            response(res, 200, 200, cert);
        } else {
            response(res, 404, 404, "No certificates found");
        }

    } catch (err) {

        response(res, 500, 500, err);
    }
}

//get all User's Certificates
export const getxIdUser = async (req, res) => {

    try {

        const { id } = req.params;

        const user = await Usuario.findByPk(id);
        if (!user) {
            response(res, 404, 404, "user don't exist");
        } else {

            const cert = await Certificado.findAll({
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [{
                    model: Usuario,
                    as: 'Usuario',
                    attributes: { exclude: ['Pass_User', 'Est_Email_User', 'createdAt', 'updatedAt'] },
                },
                {
                    model: Cursos,
                    as: 'Curso',
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                }
                ],
                where: { Id_User_FK: id }
            });
            if (cert) {
                response(res, 200, 200, cert);
            } else {
                response(res, 404, 404, "No certificates found");
            }
        }

    } catch (err) {

        response(res, 500, 500, err);
    }

}

//get certificates by curso
export const getCertificatesBycurso = async (req, res) => {

    try {

        const { id } = req.params;
        //verify user exists
        const curso = await Cursos.findByPk(id);
        if (!curso) {
            response(res, 404, 404, "course don't exist");
        } else {
            const cert = await Certificado.findAll({
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [{
                    model: Usuario,
                    as: 'Usuario',
                    attributes: { exclude: ['Pass_User', 'Est_Email_User', 'createdAt', 'updatedAt'] },
                },
                {
                    model: Cursos,
                    as: 'Curso',
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                }
                ],
                where: { Id_Cur_FK: id }
            });
            if (cert) {
                response(res, 200, 200, cert);
            } else {
                response(res, 404, 404, "No certificates found");
            }
        }

    } catch (err) {

        response(res, 500, 500, err);

    }
}

export const createCert = async (req, res) => {

    try {
        const { Tit_Cert, Descp_Cert, Fec_Crea_Cert, Firm_Dig_Cert, Id_User, Id_Cur } = req.body;

        //verificar que exista el usuario
        const user = await Usuario.findByPk(Id_User);

        //verificar que exista el curso
        const curso = await Cursos.findByPk(Id_Cur);

        //verificar que certificado no exista
        const cert = await Certificado.findOne({ where: { Id_User_FK: Id_User, Id_Cur_FK: Id_Cur } });

        //verificar que el curso este completado 
        let inscripcion = await Inscripcione.findOne({ where: { Id_Cur_FK: Id_Cur, Id_User_FK: Id_User } });
        const { Prog_Cur } = inscripcion.dataValues;

        if (inscripcion) {

            if (Prog_Cur == 100) {

                if (user && curso && !cert) {
                    const datos = {
                        Id_User_FK: Id_User,
                        Id_Cur_FK: Id_Cur,
                        Tit_Cert: Tit_Cert,
                        Descp_Cert: Descp_Cert,
                        Fec_Crea_Cert: Fec_Crea_Cert,
                        Firm_Dig_Cert: Firm_Dig_Cert,
                    }

                    //INSCRIBIMOS
                    const responses = await Certificado.create(datos);
                    if (responses) {
                        response(res, 200);
                    } else {
                        response(res, 500, 500, "Error creating Certificate");
                    }
                } else {
                    if (cert) {
                        response(res, 409, 409, "Certificate already created");
                    } else {
                        response(res, 404, 404, "user or course not found");
                    }
                }
            } else {
                response(res, 403, 403, 'Course is not finished, actual progress is : ' + Prog_Cur + '%, is required 100%')
            }
        } else {
            response(res, 404, 404, 'user is not registered in this course')
        }

    } catch (err) {

        response(res, 500, 500, err);
    }

}


export const updateCert = async (req, res) => {
    try {
        const { id } = req.params;


        //Tit_Cert, Descp_Cert, Fec_Crea_Cert, Firm_Dig_Cert, Id_User, Id_Cur, New_Curso
        const datos = req.body;
        let objDatos;

        let certificado = await Certificado.findOne({ where: { Id_User_FK: id, Id_Cur_FK: datos.Id_Cur } })

        if (!certificado) {
            response(res, 404, 404, 'user is not registered in this course')
        } else {
            certificado = certificado.dataValues;
            if (datos.New_Curso) {
                const curso = await Cursos.findByPk(datos.New_Curso);
                if (!curso) {
                    response(res, 404, 404, "New course don't exist");
                } else {

                    //we verify that the new certificate isn't already exists
                    const NewCertcxCurso = await Certificado.findOne({ where: { Id_User_FK: id, Id_Cur_FK: datos.New_Curso } });

                    if (NewCertcxCurso) {
                        response(res, 409, 409, "Certificate already created");
                    } else {
                        objDatos = {
                            Id_Cur_FK: datos.New_Curso,
                            Tit_Cert: datos.Tit_Cert || certificado.Tit_Cert,
                            Descp_Cert: datos.Descp_Cert || certificado.Descp_Cert,
                            Fec_Crea_Cert: datos.Fec_Crea_Cert || certificado.Fec_Crea_Cert,
                            Firm_Dig_Cert: datos.Firm_Dig_Cert || certificado.Firm_Dig_Cert
                        }
                    }

                }
            } else {
                objDatos = {
                    Tit_Cert: datos.Tit_Cert || certificado.Tit_Cert,
                    Descp_Cert: datos.Descp_Cert || certificado.Descp_Cert,
                    Fec_Crea_Cert: datos.Fec_Crea_Cert || certificado.Fec_Crea_Cert,
                    Firm_Dig_Cert: datos.Firm_Dig_Cert || certificado.Firm_Dig_Cert
                }
            }

            const cert = await Certificado.update(objDatos, { where: { Id_User_FK: id, Id_Cur_FK: datos.Id_Cur } });
            if (cert) {
                response(res, 200);
            } else {
                response(res, 500, 500, "Error updating Certificate");
            }
        }

    } catch (err) {
        response(res, 500, 500, err);
    }
}
