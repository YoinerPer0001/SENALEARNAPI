import { sequelize } from "../database/db.js";
import { DataTypes } from "sequelize";

export const respuestaseval = sequelize.define('respuestaseval',{
    Id_Res_Eval:{
        type:DataTypes.STRING,
        primaryKey:true,
        allowNull:false
    },
    Text_Resp_Eval:{
        type:DataTypes.STRING,
        allowNull:false
    },
    Resp_Correcta_Eval:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    Id_Preg_Eval_FK:{
        type:DataTypes.STRING,
        allowNull:false
    },
    ESTADO_REGISTRO:{
        type: DataTypes.INTEGER,
        defaultValue:1,
        allowNull: false
    }
})

