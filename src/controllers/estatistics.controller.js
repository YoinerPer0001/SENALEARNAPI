import { sequelize } from '../database/db.js'
import { Cursos } from '../models/cursos.model.js';
import { Inscripcione } from '../models/inscripciones.model.js';
import { Usuario } from '../models/users.model.js';
import moment from 'moment'
import { Op, and } from 'sequelize'
import { response } from '../utils/responses.js';

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

export const GetCoursesDest = async (req, res)=>{
    
    try{
         //cursos destacados
         const cursosDestacados = await Inscripcione.findAll({
            attributes: ['Id_Cur_FK', [sequelize.fn('COUNT', sequelize.col('Id_Cur_FK')), 'inscripciones']],
            group: ['Id_Cur_FK'],
            order: [[sequelize.literal('inscripciones'), 'DESC']],
            limit: 6,
            include: {
                model: Cursos,
                attributes: {
                    exclude: ['Id_Cur', 'createdAt', 'updatedAt']
                },
                include:{
                    model: Usuario,
                    attributes: {
                        exclude: ['Id_User', 'Pass_User', 'Est_Email_User', 'createdAt', 'updatedAt']
                    }
                }
            }
        })
        response(res, 200, 200, cursosDestacados)
    }catch(err){
        response(res, 500, 500, err)
    }
}