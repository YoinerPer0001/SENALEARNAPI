import { sequelize } from "../database/db.js";
import { DataTypes } from "sequelize";
import { Cursos } from "./cursos.model.js";

export const Categorias = sequelize.define('categorias',{
    Id_Cat:{
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull:false
    },
    Nom_Cat:{
        type: DataTypes.STRING,
        allowNull: false
    }
})

Categorias.hasMany(Cursos,{foreignKey: 'Id_Cat_FK'});
Cursos.belongsTo(Categorias,{foreignKey: 'Id_Cat_FK', targetKey: 'Id_Cat'});

