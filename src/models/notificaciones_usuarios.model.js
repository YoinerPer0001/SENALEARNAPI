import { sequelize } from "../database/db.js";
import { DataTypes } from "sequelize";

export const notificaciones_usuarios = sequelize.define('notificaciones_usuarios',{
    Id_Not_Usu:{
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull:false
    },
    Id_Not_FK:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Id_User_FK:{
        type: DataTypes.STRING,
        allowNull:false
    },
    leida:{
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
    },
    ESTADO_REGISTRO:{
        type: DataTypes.INTEGER,
        defaultValue:1,
        allowNull: false
    }
})