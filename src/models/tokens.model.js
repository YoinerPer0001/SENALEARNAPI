import { sequelize } from "../database/db.js";
import { DataTypes } from "sequelize";

export const Token = sequelize.define('Token',{
    Id_Token:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Token:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Fec_Caducidad:{
        type: DataTypes.STRING,
        allowNull: false
    },
    User_Id_FK:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Tipo_token:{
        type: DataTypes.CHAR,
        allowNull: false,
        defaultValue:'1'
    }
})