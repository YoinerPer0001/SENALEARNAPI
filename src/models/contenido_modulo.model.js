import { sequelize } from "../database/db.js";
import { DataTypes } from "sequelize";
import { Usuario_contenido } from "./usuario_contenidos.model.js";

export const Contenido_Modulos = sequelize.define('Contenido_Modulos',{
    Id_Cont :{
        type:DataTypes.STRING,
        primaryKey:true,
        allowNull:false
    },
    Tit_Cont:{
        type:DataTypes.STRING,
        allowNull:false
    },
    Tip_Cont:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    Url_Cont:{
        type:DataTypes.STRING,
        allowNull:false
    },
    Id_Mod_FK:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

Contenido_Modulos.hasMany(Usuario_contenido,{foreignKey:'Id_Cont_Mod_FK'})
Usuario_contenido.belongsTo(Contenido_Modulos,{foreignKey:'Id_Cont_Mod_FK',targetKey:'Id_Cont'})