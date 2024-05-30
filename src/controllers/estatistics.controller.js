import { sequelize } from '../database/db.js'
import { Cursos } from '../models/cursos.model.js';
import { Inscripcione } from '../models/inscripciones.model.js';
import { Usuario } from '../models/users.model.js';
import moment from 'moment'
import { Op, and } from 'sequelize'
import { response } from '../utils/responses.js';
import { Certificado } from '../models/cerificados.model.js';
import { Token } from '../models/tokens.model.js';
import { Modulocurso } from '../models/modulos_cursos.model.js';
import { evaluacion } from '../models/evaluacion.model.js';
import { Usuario_contenido } from '../models/usuario_contenidos.model.js';
import { Contenido_Modulos } from '../models/contenido_modulo.model.js';

export const statisticsPanel = async (req, res) => {

    try {
        //numero total de usuarios
        const total_users = await Usuario.count();

        //tasa de finalizacion de cursos
        const CantidadInsc = await Inscripcione.count();
        const coursesCompleted = await Inscripcione.count({ where: { Prog_Cur: 100 } })
        const tasaFinalizacion = ((coursesCompleted * 100) / CantidadInsc).toFixed(2);

        //progreso promedio de los usuarios
        const ProgresoTotal = await Inscripcione.sum('Prog_Cur');
        const ProgresoPromedio = (ProgresoTotal / CantidadInsc).toFixed(2);

        //tasa de abandono de cursos

        const fechaLimite = moment().subtract(6, 'months').toDate();
        const CantidadAbandonos = await Inscripcione.count({
            where: {
                updatedAt: {
                    [Op.lt]: fechaLimite  // Obtiene las inscripciones que fueron actualizadas hace más de 2 meses
                },
                Prog_Cur: {
                    [Op.ne]: 100 // Prog_Cur no es igual a 100
                }
            }
        });


        const tasaAbandono = ((CantidadAbandonos * 100) / CantidadInsc).toFixed(2);


        const data = {
            total_usuarios: total_users,
            tasaFinalizacion,
            ProgresoPromedio,
            tasaAbandono
        }
        response(res, 200, 200, data)

    } catch (err) {
        response(res, 500, 500, err)
    }


}

export const GetCoursesDest = async (req, res) => {

    try {
        //cursos destacados
        const cursosDestacados = await Inscripcione.findAll({
            attributes: ['Id_Cur_FK', [sequelize.fn('COUNT', sequelize.col('Id_Cur_FK')), 'inscripciones']],
            group: ['Id_Cur_FK'],
            order: [[sequelize.literal('inscripciones'), 'DESC']],
            limit: 8,
            include: {
                model: Cursos,
                attributes: {
                    exclude: ['Id_Cur', 'createdAt', 'updatedAt']
                },
                include: {
                    model: Usuario,
                    attributes: {
                        exclude: ['Id_User', 'Pass_User', 'Est_Email_User', 'createdAt', 'updatedAt']
                    }
                }
            }
        })
        response(res, 200, 200, cursosDestacados)
    } catch (err) {
        response(res, 500, 500, err)
    }
}

export const getUserStatistics = async (req, res) => {

    const dataEnv = {
        user: [],
        certificados: {
            total: 0,
            lista: []
        },
        Inscripciones: [],
        cursosCompletados: 0,
        tiempoProm: 0,
    };
    try {

        const { id } = req.params;

        const dataUser = await Usuario.findByPk(id, {
            attributes: { exclude: ['Pass_User', 'createdAt', 'updatedAt'] }
        })

        const certificados = await Certificado.findAll({
            where: { Id_User_Fk: id },
            include: {
                model: Cursos,
                as: 'Curso',
                attributes: {
                    exclude: ['Id_Cur', 'createdAt', 'updatedAt']
                }
            },
            attributes: {
                exclude: ['Id_Cur', 'createdAt', 'updatedAt']
            }
        })


        const Inscripciones = await Inscripcione.findAll({
            where: { Id_User_Fk: id },
            attributes: [
                [sequelize.fn('COUNT', sequelize.col('Id_User_Fk')), 'cantidad']
            ]
        })

        const inscCompleted = await Inscripcione.count({
            where: {
                Id_User_Fk: id,
                Prog_Cur: 100
            }
        })

        //tiempo promedio en la plataforma
        const tiempoLogin = await Token.findAll({
            where: {
                User_Id_FK: id,
                Tipo_token: 2
            },
            attributes: {
                exclude: ['Fec_Caducidad', 'User_Id_FK', 'Id_Token', 'Tipo_token', 'Token', 'ESTADO_REGISTRO']
            }
        })

        let acumulador = 0;


        tiempoLogin.map(tiempo => {
            acumulador += (tiempo.updatedAt - tiempo.createdAt) / 60000
        })


        dataEnv.user = dataUser;
        dataEnv.certificados.lista = certificados; //CERIFICADOS
        dataEnv.certificados.total = certificados.length //CANTIDAD DE CERTIFICADOS
        dataEnv.Inscripciones = Inscripciones;  //NUMERO DE CURSOS INSCRITOS
        dataEnv.cursosCompletados = inscCompleted  //NUMERO DE CURSOS COMPLETADOS
        dataEnv.tiempoProm = (acumulador / tiempoLogin.length).toFixed(2) //tiempo promedio en la plataforma


        response(res, 200, 200, dataEnv)

    } catch (err) {
        response(res, 500, 500, err)
    }
}

export const getCoursesNumbers = async (req, res) => {
    let objEnv = {
        estudiantes: 0,
        modulos: 0,
        evaluaciones: 0,
        horas: 0
    }
    try {
        const { id } = req.params;

        const existe = await Cursos.findByPk(id);
        if (existe) {


            //estudiantes inscritos
            const numberStudents = await Inscripcione.count({
                where: { Id_Cur_FK: id }
            })
            const numberModules = await Modulocurso.count({
                where: { Id_Cur_FK: id }
            })

            const numberEval = await evaluacion.count({
                include: {
                    model: Modulocurso,
                    where: { Id_Cur_FK: id }
                }
            })

            const duracionTotal = await Cursos.findByPk(id, {
                attributes: ['Hor_Cont_Total']
            })

            objEnv.estudiantes = numberStudents;
            objEnv.modulos = numberModules;
            objEnv.evaluaciones = numberEval;
            objEnv.horas = duracionTotal.Hor_Cont_Total;

            response(res, 200, 200, objEnv)
        } else {
            response(res, 404, 404, 'Course not found')
        }

    } catch (err) {
        response(res, 500, 500, err)
    }

}

export const getPromContView = async (req, res) => {

    try {
        const { id, date, datef } = req.params;

        const startDate = new Date(date);
        const endDate = new Date(datef);


        const existe = await Cursos.findByPk(id);
        if (existe) {

            //estudiantes inscritos
            const FechViews = await Usuario_contenido.findAll({
                attributes: ['Fech_Visualizacion'],
                where: {
                    Fech_Visualizacion: {
                        [Op.between]: [startDate, endDate]
                    }
                },
                include: {
                    model: Contenido_Modulos,

                    include: {
                        model: Modulocurso,
                        where: { Id_Cur_FK: id }
                    }
                },
                order: [
                    ['Fech_Visualizacion', 'ASC']
                ]
            })
            


            const visualizacionesPorDia = FechViews.reduce((acc, curr) => {
                if (curr.Contenido_Modulo != null) {
                    const date = new Date(curr.Fech_Visualizacion);
                    const dateString = date.toISOString().split('T')[0];
                    const dia = dateString.split('-')[2];

                    if (!acc[dia]) {
                        acc[dia] = 0;
                    }
                    acc[dia]++;
                    return acc;
                } else {
                    return 0
                }

            }, {});

            const ordenado = Object.entries(visualizacionesPorDia).sort(((a, b) => a[0] - b[0]))

            response(res, 200, 200, { cantidad: ordenado });


        } else {
            response(res, 404, 404, 'Course not found')
        }

    } catch (err) {
        response(res, 500, 500, err)
    }

}

export const getEstAvzCurso = async (req, res) => {
    try {

        const { id } = req.params;

        let curso = await Cursos.findByPk(id);
        if (!curso) {
            response(res, 404, 404, 'Course not found')
        } else {

            curso = curso.dataValues;

            //inscripciones totales
            const InscTotales = await Inscripcione.count({
                where: {
                    Id_Cur_FK: id
                }
            })

            //tasa de finalizacion
            const InscCompletadas = await Inscripcione.count({
                where: {
                    Id_Cur_FK: id,
                    Prog_Cur: 100
                }
            })

            const tasaFinalizacion = (InscCompletadas * 100) / InscTotales;
            //tasa de abandono (usuarios que no actualizaron su progreso durante 6 meses)
            const fechaLimite = moment().subtract(6, 'months').toDate();
            
            const CantidadAbandonos = await Inscripcione.count({
                where: {
                    updatedAt: {
                        [Op.lt]: fechaLimite 
                    },
                    Prog_Cur: {
                        [Op.ne]: 100 
                    },
                    Id_Cur_FK:id 
                }
            });
            const tasaAbandono = ((CantidadAbandonos*100)/InscTotales).toFixed(2);

            //tiempo promedio contenido
            const tiempoContenido = await Contenido_Modulos.findAll({
                attributes:['Duracion_Cont'],
                include:{
                    model: Modulocurso,
                    where:{
                        Id_Cur_FK:id
                    }
                }
            })
            let tiempoTotal= 0;
            let contadorContenidos = 0;
     
            tiempoContenido.map(tiempo=>{
                tiempoTotal+=parseFloat(tiempo.Duracion_Cont) 
                contadorContenidos++
            })
            const tiempoPromCont = (tiempoTotal/contadorContenidos).toFixed(2);


            const CantVideos = await Contenido_Modulos.count({
                attributes:['Duracion_Cont'],
                where:{Tip_Cont: 2},
                include:{
                    model: Modulocurso,
                    where:{
                        Id_Cur_FK:id
                    }
                }
            })

            //instructor info
            const CantCursosInst = await Cursos.count({
                include: [{
                    model: Usuario,
                    where: {
                        Id_User: curso.Id_Inst
                    },
                    attributes: { exclude: ['Pass_User', 'Est_Email_User', 'createdAt', 'updatedAt'] },
                }],
                attributes: ['Id_Inst']
            });
            

            const InstInfo = await Usuario.findByPk(curso.Id_Inst)

            const objEnv ={
                tasaFinalizacion,
                tasaAbandono,
                tiempoPromCont,
                CantVideos,
                InstInfo,
                CantCursosInst
            }
            response(res,200,200,objEnv)

        }

    } catch (err) {
        response(res, 500, 500, err)
    }
}