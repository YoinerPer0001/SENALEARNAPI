import { sequelize } from "../database/db.js";
import { DataTypes } from "sequelize";
import { notificaciones_usuarios } from "./notificaciones_usuarios.model.js";

export const notificaciones = sequelize.define('notificaciones',{
    Id_Not : {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    Not_Tit:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Not_Mens:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Not_Fec_Cre :{
        type: DataTypes.DATE,
        allowNull: false
    },
    ESTADO_REGISTRO:{
        type: DataTypes.INTEGER,
        defaultValue:1,
        allowNull: false
    }
})

notificaciones.hasMany(notificaciones_usuarios, {foreignKey:'Id_Not_FK'})
notificaciones_usuarios.belongsTo(notificaciones, {foreignKey: 'Id_Not_FK', targetKey:'Id_Not'})