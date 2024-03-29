import { sequelize } from "../database/db.js";
import { DataTypes } from "sequelize";

export const Localization = sequelize.define('Localization', {
    Id_Loc:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Dir_Ip:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Id_User_FK:{
        type: DataTypes.STRING,
        allowNull: false
    }
})