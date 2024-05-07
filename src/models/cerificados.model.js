import { sequelize } from "../database/db.js";
import { DataTypes } from "sequelize";
import { Usuario } from "./users.model.js";
import { Cursos } from "./cursos.model.js";

export const Certificado = sequelize.define('Certificado',{
    Id_User_FK:{
        type:DataTypes.STRING,
        primaryKey:true,
        allowNull:false
    },
    Id_Cur_FK:{
        type:DataTypes.STRING,
        primaryKey:true,
        allowNull:false
    },
    Firm_Dig_Cert:{
        type:DataTypes.STRING,
        allowNull:false
    },
    Fec_Crea_Cert:{
        type:DataTypes.DATE,
        allowNull:false
    },
    Descp_Cert:{
        type:DataTypes.STRING,
        allowNull:false
    },
    Tit_Cert:{
        type:DataTypes.STRING,
        allowNull:false
    },
    ESTADO_REGISTRO:{
        type: DataTypes.INTEGER,
        defaultValue:1,
        allowNull: false
    }
})

