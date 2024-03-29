import { sequelize } from "../database/db.js";
import { DataTypes } from "sequelize";

export const Opcione = sequelize.define('Opcione',{
    id_opcion:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nombre_opcion:{
        type:DataTypes.STRING,
        allowNull:false
    }
})