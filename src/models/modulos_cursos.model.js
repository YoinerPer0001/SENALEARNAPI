import { sequelize } from "../database/db.js";
import { DataTypes } from "sequelize";
import { Contenido_Modulos } from "./contenido_modulo.model.js";
import { evaluacion } from "./evaluacion.model.js";

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
    Porcentaje_Asig:{
        type:DataTypes.DECIMAL,
        allowNull:false,
        defaultValue:0
    },
    Horas_Cont_Mod:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
})

Modulocurso.hasMany(Contenido_Modulos,{foreignKey:'Id_Mod_FK'})
Contenido_Modulos.belongsTo(Modulocurso,{foreignKey:'Id_Mod_FK',targetKey:'Id_Mod'})

Modulocurso.hasMany(evaluacion,{foreignKey:'Id_Mod_Cur_FK'})
evaluacion.belongsTo(Modulocurso,{foreignKey:'Id_Mod_Cur_FK',targetKey:'Id_Mod'});