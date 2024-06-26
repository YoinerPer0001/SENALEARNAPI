import { response } from "../utils/responses.js";
import jsonwebtoken from 'jsonwebtoken'
import { Usuario } from "../models/users.model.js";
import { Usuario_contenido } from "../models/usuario_contenidos.model.js";
import 'dotenv/config.js'
import uniqid from 'uniqid';
import { Contenido_Modulos } from "../models/contenido_modulo.model.js";
import { Modulocurso } from "../models/modulos_cursos.model.js";
import { Inscripcione } from "../models/inscripciones.model.js";



export const GetContVistosXUsuario = async (req, res) => {

    try {
        const { id } = req.params;

        const user = await Usuario.findByPk(id)
        if (!user) {
            response(res, 404, 404, "user don't exist");
        } else {
            const vistos = await Usuario_contenido.findAll({ where: { Id_User_FK: id }, order: [['Fech_Visualizacion', 'DESC']] });
            if (vistos) {
                response(res, 200, 200, vistos);
            } else {
                response(res, 404, 404, 'vistos not found');
            }
        }

    } catch (err) {
        response(res, 500, 500, "Something went wrong");
    }

}


export const createUsuario_Cont = async (req, res) => {
    try {
        const Id_Vista = uniqid();
        const { Id_User } = req.Tokendata.user;

        const { Id_Cont } = req.body;
        const Fech_Visualizacion = Date.now();
        let contExist = await Contenido_Modulos.findByPk(Id_Cont);

        if (!contExist) {
            response(res, 404, 404, 'content not found');
        } else {
            const { Id_Mod_FK } = contExist.dataValues;
            const { Id_Cur_FK } = await Modulocurso.findByPk(Id_Mod_FK)
            //verificamos que el usuario este inscrito para poder guardar la vista
            const inscripcion = await Inscripcione.findOne({ where: { Id_User_FK: Id_User, Id_Cur_FK: Id_Cur_FK } })

            if (!inscripcion) {
                return response(res, 401, 401, 'user not inscription');
            } else {

                // verificamos que no haya visto el contenido antes
                let contenido = await Usuario_contenido.findOne({ where: { Id_Cont_Mod_FK: Id_Cont, Id_User_FK: Id_User } })
                if (contenido) {
                    contenido = contenido.dataValues;
                    //actualizamos el contenido
                    const updateContent = await Usuario_contenido.update({Fech_Visualizacion: Fech_Visualizacion }, { where: {Id_Vista: contenido.Id_Vista  } })

                    return response(res, 200);

                } else {
                    const datos = {
                        Id_Cont_Mod_FK: Id_Cont,
                        Id_User_FK: Id_User,
                        Id_Vista: Id_Vista,
                        Fech_Visualizacion: Fech_Visualizacion
                    }
                    const newContentView = await Usuario_contenido.create(datos);

                    if (newContentView) {
                        //actualizo la tabla de inscripciones con el porcentaje de avance
                        const { Porcentaje_Asig } = await Contenido_Modulos.findByPk(Id_Cont)
                        const { Prog_Cur } = await Inscripcione.findOne({ where: { Id_User_FK: Id_User, Id_Cur_FK: Id_Cur_FK } })

                        const progresoTotal = parseFloat(Porcentaje_Asig) + parseFloat(Prog_Cur);


                        const updateInsc = await Inscripcione.update({ Prog_Cur: progresoTotal }, { where: { Id_User_FK: Id_User, Id_Cur_FK: Id_Cur_FK } })
                        if (updateInsc) {
                            response(res, 200);
                        } else {
                            response(res, 500, 500, 'error creating progress view');
                        }

                    } else {
                        response(res, 500, 500, 'error creating progress view');
                    }

                }

            }

        }

    } catch (err) {
        response(res, 500, 500, err);
    }


}


//edit cont visto
export const editContentView = async (req, res) => {

    try {


        //const { Id_User, Id_Cur, fecha_insc } = req.body;
        const { id } = req.params;
        const datos = req.body

        //verify that the inscription exists
        let cont = await Usuario_contenido.findOne({ where: { Id_User_FK: id, Id_Cont_Mod_FK: datos.Id_Cont_Mod } });

        if (!cont) {
            response(res, 404, 404, "inscription don't exist");

        } else {

            cont = cont.dataValues;
            let data;
            let contenido;

            //if wants update the course
            if (datos.New_Cont) {

                //we verify that the new course exists
                contenido = await Contenido_Modulos.findByPk(datos.New_Cont);

                if (!contenido) {

                    response(res, 404, 404, "New content don't exist");

                } else {

                    //we verify that the new inscription isn't already exists

                    const NewinscxCurso = await Usuario_contenido.findOne({ where: { Id_User_FK: id, Id_Cont_Mod_FK: datos.New_Cont } });

                    if (NewinscxCurso) {
                        response(res, 409, 409, "course already inscrited");
                    } else {

                        data = {
                            Id_Cont_Mod_FK: datos.New_Cont,
                            Fech_Visualizacion: datos.Fech_Visualizacion || cont.Fech_Visualizacion
                        }

                    }
                }
            } else {
                data = {
                    Fech_Visualizacion: datos.Fech_Visualizacion || cont.Fech_Visualizacion
                }
            }

            if (contenido) {
                //edit the inscription
                const edited = await Usuario_contenido.update(data, { where: { Id_User_FK: id, Id_Cont_Mod_FK: datos.Id_Cont_Mod } });

                if (edited) {

                    response(res, 200);
                } else {

                    response(res, 500, 500, "Error editing");
                }
            }
        }




    } catch (err) {
        response(res, 500, 500, err);

    }

}


export const deleteUserCont = async (req, res) => {
    try{

        const {id} = req.params

        const asignacion = await Usuario_contenido.findByPk(id)
        if(asignacion){
    
            const responses = await Usuario_contenido.update({ESTADO_REGISTRO: 0},{where:{Id_Vista: id}})
            if(responses){
                response(res, 200);
            }else{
                response(res, 500, 500, "error deleting view");
            }

        }else{
            response(res, 404, 404, "view not found");
        }

    }catch (err) {
        response(res, 500, 500, err);
    }
}