import { Sequelize , DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";
import { preguntaseval } from "./preguntasEval.model.js";

export const evaluacion = sequelize.define('evaluacion',{
    Id_Eva:{
        type:DataTypes.STRING,
        primaryKey:true,
        allowNull:false
    },
    Tit_Eva:{
        type:DataTypes.STRING,
        allowNull:false
    },
    Des_Eva:{
        type:DataTypes.STRING,
        allowNull:false
    },
    Fec_Crea:{
        type:DataTypes.DATE,
        allowNull:false
    },
    Fec_Cer:{
        type:DataTypes.DATE,
        allowNull:false
    },
    Id_Mod_Cur_FK:{
        type:DataTypes.STRING,
        allowNull:false
    },
    Not_Min_Apr_Eva:{
        type:DataTypes.DECIMAL,
        allowNull:false
    },
    Estado_Eval:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0
    },
    Intentos_Eval:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0
    }
})

evaluacion.hasMany(preguntaseval, {foreignKey:'Id_Eval_FK'})
preguntaseval.belongsTo(evaluacion,{foreignKey:'Id_Eval_FK',targetKey:'Id_Eva'})