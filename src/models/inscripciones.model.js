import { sequelize } from "../database/db.js";
import { DataTypes } from "sequelize";
import { Usuario } from "./users.model.js";
import { Cursos } from "./cursos.model.js";

export const Inscripcione = sequelize.define('Inscripcione',
{
    Id_User_FK: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    Id_Cur_FK:{
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    Prog_Cur:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha_insc:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue:  sequelize.literal('CURRENT_TIMESTAMP')
    },
    ESTADO_REGISTRO:{
        type: DataTypes.INTEGER,
        defaultValue:1,
        allowNull: false
    }
})