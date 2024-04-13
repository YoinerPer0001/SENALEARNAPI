import { response } from "../utils/responses.js";
import jsonwebtoken from 'jsonwebtoken'
import { InstPermissions, adminPermissions } from "../utils/manage.permissions.js";
import { Usuario } from "../models/users.model.js";
import { Usuario_contenido } from "../models/usuario_contenidos.model.js";
import 'dotenv/config.js'
import uniqid from 'uniqid';
import { Contenido_Modulos } from "../models/contenido_modulo.model.js";
import { Modulocurso } from "../models/modulos_cursos.model.js";
import { Inscripcione } from "../models/inscripciones.model.js";
const jwt = jsonwebtoken;

export const createUsuario_Cont = async (req, res) => {
    jwt.verify(req.token, process.env.SECRETWORD, async(err, data) => {
        if (err) {
            response(res, 401, 401, 'token not valid');
        } else {
            const Id_Vista = uniqid();
            const { Id_User } = data.user;
            const { Id_Cont, Fech_Visualizacion } = req.body;

            //verificamos que el contenido no este registrado
            const contenido = await Usuario_contenido.findOne({ where: { Id_Cont_Mod_FK: Id_Cont, Id_User_FK: Id_User } })

            if(contenido){
                response(res, 401, 401, 'content already registered');
            }else{
                const datos ={
                    Id_Cont_Mod_FK: Id_Cont,
                    Id_User_FK: Id_User,
                    Id_Vista: Id_Vista,
                    Fech_Visualizacion: Fech_Visualizacion
                }
                const newContentView = await Usuario_contenido.create(datos);

                if(newContentView){
                    //actualizo la tabla de inscripciones con el porcentaje de avance
                    const {Id_Mod_FK, Porcentaje_Asig} = await Contenido_Modulos.findByPk(Id_Cont)
                    const {Id_Cur_FK} = await Modulocurso.findByPk(Id_Mod_FK)
                    const {Prog_Cur} = await Inscripcione.findOne({where: {Id_User_FK: Id_User, Id_Cur_FK: Id_Cur_FK}})
                    
                    const progresoTotal = parseFloat(Porcentaje_Asig)  + parseFloat(Prog_Cur);
                    

                    const updateInsc = await Inscripcione.update({Prog_Cur:progresoTotal},{where:{Id_User_FK: Id_User, Id_Cur_FK: Id_Cur_FK}})
                    if(updateInsc){
                        response(res, 200);
                    }else{
                        response(res, 500, 500, 'error creating progress view');
                    }
                   
                }else{
                    response(res, 500, 500, 'error creating progress view');
                }
            }

        }
    })

}