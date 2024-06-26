import { sequelize } from "../database/db.js";
import { DataTypes } from "sequelize";
import { Role } from "./roles.model.js";
import { Opcione } from "./opciones.model.js";

export const Roles_Opcione = sequelize.define('Roles_Opcione',{
    Id_Rol_fk :{
        type:DataTypes.INTEGER,
        primaryKey:true,
        references:{
            model:Role,
            key:'Id_Rol'
        }
    },
    id_opcion_fk:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        references:{
            model:Opcione,
            key:'id_opcion'
        }
    },
    ESTADO_REGISTRO:{
        type: DataTypes.INTEGER,
        defaultValue:1,
        allowNull: false
    }
})

Role.hasMany(Roles_Opcione,{foreignKey:'Id_Rol_fk'})
Roles_Opcione.belongsTo(Role,{foreignKey:'Id_Rol_fk'})

Opcione.hasMany(Roles_Opcione,{foreignKey: 'id_opcion_fk'})
Roles_Opcione.belongsTo(Opcione,{as:"Opcion", foreignKey: 'id_opcion_fk'})