import { sequelize } from "../database/db.js";
import { DataTypes } from "sequelize";

export const Objetivos_Cursos = sequelize.define('Objetivos_Cursos',{
    Id_Objetivo:{
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    Desc_Objetivo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Id_Cur_FK:{
        type: DataTypes.STRING,
        allowNull: false
    }
})

