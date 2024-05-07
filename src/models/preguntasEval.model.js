import { sequelize } from "../database/db.js";
import { DataTypes } from "sequelize";
import { respuestaseval } from "./respuestasEval.model.js";

export const preguntaseval = sequelize.define('preguntaseval',{
    Id_Preg_Eval:{
        type:DataTypes.STRING,
        primaryKey:true,
        allowNull:false
    },
    Text_Preg_Eval:{
        type:DataTypes.STRING,
        allowNull:false
    },
    Id_Eval_FK:{
        type:DataTypes.STRING,
        allowNull:false
    },
    ESTADO_REGISTRO:{
        type: DataTypes.INTEGER,
        defaultValue:1,
        allowNull: false
    }
})

preguntaseval.hasMany(respuestaseval,{as:'Respuestas', foreignKey: 'Id_Preg_Eval_FK'})
respuestaseval.belongsTo(preguntaseval,{foreignKey: 'Id_Preg_Eval_FK',targetKey:'Id_Preg_Eval'})