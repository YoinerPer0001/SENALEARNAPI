import { sequelize } from "../database/db.js";
import { DataTypes } from 'sequelize'
import { Token } from "./tokens.model.js";
import { Localization } from "./localizacion.model.js";


export const Usuario = sequelize.define('Usuario', {
    Id_User:{
        type: DataTypes.STRING,
        primaryKey: true,
        unique:true,
        allowNull:false
    },
    Nom_User:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Ape_User:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Ema_User:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Pass_User:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Id_Rol_FK:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Est_Email_User:{
        type: DataTypes.INTEGER,
        defaultValue:0,
        allowNull: false
    },
    Fot_User:{
        type: DataTypes.STRING,
        allowNull: true
    },
    Tel_User:{
        type: DataTypes.STRING,
        allowNull: true
    }
})

Usuario.hasMany(Token,{foreignKey:'User_Id_FK'});
Token.belongsTo(Usuario, {foreignKey :'User_Id_FK', targetKey: 'Id_User'});

Usuario.hasMany(Localization,{foreignKey:'Id_User_FK'});
Localization.belongsTo(Usuario, {foreignKey :'Id_User_FK', targetKey: 'Id_User'});