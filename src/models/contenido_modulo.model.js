import { sequelize } from "../database/db.js";
import { DataTypes } from "sequelize";
import { Usuario_contenido } from "./usuario_contenidos.model.js";

export const Contenido_Modulos = sequelize.define('Contenido_Modulos',{
    Id_Cont :{
        type:DataTypes.STRING,
        primaryKey:true,
        allowNull:false
    },
    Indice_Cont:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    Tit_Cont:{
        type:DataTypes.STRING,
        allowNull:false
    },
    Tip_Cont:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    Url_Cont:{
        type:DataTypes.STRING,
        allowNull:true,
        defaultValue:""
    },
    Porcentaje_Asig:{
        type:DataTypes.DECIMAL,
        allowNull:false,
        defaultValue:0
    },
    Id_Mod_FK:{
        type:DataTypes.STRING,
        allowNull:false
    },
    Duracion_Cont:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false,
        defaultValue:1.00
    },
    ESTADO_REGISTRO:{
        type: DataTypes.INTEGER,
        defaultValue:1,
        allowNull: false
    }
})

Contenido_Modulos.hasMany(Usuario_contenido,{foreignKey:'Id_Cont_Mod_FK'})
Usuario_contenido.belongsTo(Contenido_Modulos,{foreignKey:'Id_Cont_Mod_FK',targetKey:'Id_Cont'})