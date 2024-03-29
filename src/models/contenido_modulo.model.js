import { sequelize } from "../database/db.js";
import { DataTypes } from "sequelize";

export const Contenido_Modulos = sequelize.define('Contenido_Modulos',{
    Id_Cont :{
        type:DataTypes.STRING,
        primaryKey:true,
        allowNull:false
    },
    Tit_Cont:{
        type:DataTypes.STRING,
        allowNull:false
    },
    Tip_Cont:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    Url_Cont:{
        type:DataTypes.STRING,
        allowNull:false
    },
    Id_Mod_FK:{
        type:DataTypes.STRING,
        allowNull:false
    }
})