import { sequelize } from "../database/db.js";
import { DataTypes } from "sequelize"
import { Usuario } from "./users.model.js";

export const Role = sequelize.define('Role',{
    Id_Rol : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nom_Rol:{
        type: DataTypes.STRING,
        allowNull: false
    },
    ESTADO_REGISTRO:{
        type: DataTypes.INTEGER,
        defaultValue:1,
        allowNull: false
    }
})

Role.hasMany(Usuario,{ foreignKey:'Id_Rol_FK'})
Usuario.belongsTo(Role,{as: "rol", foreignKey:'Id_Rol_FK',targetKey:'Id_Rol'})