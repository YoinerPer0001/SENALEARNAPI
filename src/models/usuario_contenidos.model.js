import { sequelize } from "../database/db.js";
import { DataTypes } from "sequelize";
import { Usuario } from "./users.model.js";
import { Contenido_Modulos } from "./contenido_modulo.model.js";

export const Usuario_contenido = sequelize.define('Usuario_contenido',{
    Id_Vista:{
        type:DataTypes.STRING,
        primaryKey:true,
        allowNull:false
    },
    Id_Cont_Mod_FK:{
        type:DataTypes.STRING,
        allowNull:false
    },
    Id_User_FK:{
        type:DataTypes.STRING,
        allowNull:false
    },
    Fech_Visualizacion:{
        type:DataTypes.DATE,
        allowNull:false
    },
    ESTADO_REGISTRO:{
        type: DataTypes.INTEGER,
        defaultValue:1,
        allowNull: false
    }
})

