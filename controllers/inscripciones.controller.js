import { getAllIns } from '../models/inscripciones.model.js'
import { response } from '../Resources/responses.js';
import { adminPermissions } from '../managePermissions/manage.permissions.js';
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


