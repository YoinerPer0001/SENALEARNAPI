import { sequelize } from "../database/db.js";
import {DataTypes} from 'sequelize'

export const Requisitos_previo = sequelize.define('Requisitos_previo',{
    Id_Req:{
        type:DataTypes.STRING,
        primaryKey:true,
        allowNull:false
    },
    Desc_Req:{
        type:DataTypes.STRING,
        allowNull:false
    },
    Id_Cur_FK:{
        type:DataTypes.STRING,
        allowNull:false
    },
    ESTADO_REGISTRO:{
        type: DataTypes.INTEGER,
        defaultValue:1,
        allowNull: false
    }
})