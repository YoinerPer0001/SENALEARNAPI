import { sequelize } from "../database/db.js";
import { DataTypes } from "sequelize";
import { Contenido_Modulos } from "./contenido_modulo.model.js";

export const Modulocurso = sequelize.define('Modulocurso',{
    Id_Mod:{
        type:DataTypes.STRING,
        primaryKey:true,
        allowNull:false
    },
    Tit_Mod:{
        type:DataTypes.STRING,
        allowNull:false
    },
    Est_Mod:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0
    },
    Id_Cur_FK:{
        type:DataTypes.STRING,
        allowNull:false
    },
    Horas_Cont_Mod:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
})

Modulocurso.hasMany(Contenido_Modulos,{foreignKey:'Id_Mod_FK'})
Contenido_Modulos.belongsTo(Modulocurso,{foreignKey:'Id_Mod_FK',targetKey:'Id_Mod'})