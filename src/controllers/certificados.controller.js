import { GetAllCert, GetAllCertByUser, GetAllCertByCourse } from '../models/cerificados.model.js';
import jsonwebtoken from 'jsonwebtoken';
import { response } from '../utils/responses.js';
import { adminPermissions } from '../utils/manage.permissions.js';
import {GetUserbyId} from '../models/users.model.js'
import {getCoursesxId} from '../models/cursos.model.js'
import 'dotenv/config'

const jwt = jsonwebtoken;

//get all certificates
export const getAllCertificates = (req, res) => {
    jwt.verify(req.token, process.env.SECRETWORD, (err, data) => {
        if (err) {
            response(res, 500, 105, "Something went wrong");
        } else {

            try {

                const { Id_Rol_FK } = data.user;
                const adminPermiso = adminPermissions(Id_Rol_FK);

                if (!adminPermiso) {
                    response(res, 403, 403, "you don't have permissions");
                } else {
                    const cert = GetAllCert();
                    if (cert.length > 0) {
                        response(res, 200, 200, cert);
                    } else {
                        response(res, 404, 404, "No certificates found");
                    }
                }
            } catch (err) {

                if (err.errno) {
                    response(res, 400, err.errno, err.code);
                } else {
                    response(res, 500, 500, "something went wrong");
                }

            }
        }

    })
}

//get certificates by user
export const getCertificatesByUser = (req, res) => {
    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {
        if (err) {
            response(res, 500, 105, "Something went wrong");
        } else {
            
            try{

                const {id} = req.params;
                //verify user exists
                const user = await GetUserbyId(id);
                if (user.length < 1) {
                    response(res, 400, 103, "user don't exist");
                }else{
                    const cert = GetAllCertByUser(id);
                    if (cert.length > 0) {
                        response(res, 200, 200, cert);
                    } else {
                        response(res, 404, 404, "No certificates found");
                    }
                }

            }catch(err) {
                if (err.errno) {
                    response(res, 400, err.errno, err.code);
                } else {
                    response(res, 500, 500, "something went wrong");
                }
            }


        }
    })
}

//get certificates by curso
export const getCertificatesBycurso = (req, res) => {
    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {
        if (err) {
            response(res, 500, 105, "Something went wrong");
        } else {
            
            try{

                const {id} = req.params;
                //verify user exists
                const curso = await getCoursesxId(id);
                if (user.length < 1) {
                    response(res, 400, 103, "course don't exist");
                }else{
                    const cert = GetAllCertByCourse(id);
                    if (cert.length > 0) {
                        response(res, 200, 200, cert);
                    } else {
                        response(res, 404, 404, "No certificates found");
                    }
                }

            }catch(err) {
                if (err.errno) {
                    response(res, 400, err.errno, err.code);
                } else {
                    response(res, 500, 500, "something went wrong");
                }
            }


        }
    })
}