import { sequelize } from "../database/db.js";
import { DataTypes } from "sequelize";

export const Resultados_Evaluacione = sequelize.define('Resultados_Evaluacione',{
    Id_Res_Eval:{
        type:DataTypes.STRING,
        primaryKey:true,
        allowNull:false
    },
    Id_Eval_FK:{
        type:DataTypes.STRING,
        allowNull:false
    },
    Id_User_FK:{
        type:DataTypes.STRING,
        allowNull:false
    },
    Puntuacion:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    Fech_Real_Eval:{
        type:DataTypes.DATE,
        allowNull:false
    },
    ESTADO_REGISTRO:{
        type: DataTypes.INTEGER,
        defaultValue:1,
        allowNull: false
    }
})