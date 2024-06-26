import { sequelize } from "../database/db.js";
import { DataTypes } from 'sequelize'
import { Token } from "./tokens.model.js";
import { Localization } from "./localizacion.model.js";
import { Cursos } from "./cursos.model.js";
import { Usuario_contenido } from "./usuario_contenidos.model.js";
import { Certificado } from "./cerificados.model.js";
import { Inscripcione } from "./inscripciones.model.js";
import { Resultados_Evaluacione } from "./resultadosEval.model.js";
import { notificaciones_usuarios } from "./notificaciones_usuarios.model.js";


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
    },
    ESTADO_REGISTRO:{
        type: DataTypes.INTEGER,
        defaultValue:1,
        allowNull: false
    }
})

Usuario.hasMany(Token,{foreignKey:'User_Id_FK'});
Token.belongsTo(Usuario, {foreignKey :'User_Id_FK', targetKey: 'Id_User'});

Usuario.hasMany(Localization,{foreignKey:'Id_User_FK'});
Localization.belongsTo(Usuario, {foreignKey :'Id_User_FK', targetKey: 'Id_User'});

Usuario.hasMany(Cursos,{foreignKey:'Id_Inst'})
Cursos.belongsTo(Usuario,{as: 'Instructor', foreignKey :'Id_Inst', targetKey: 'Id_User'})

Usuario.hasMany(Usuario_contenido, {foreignKey:'Id_User_FK'})
Usuario_contenido.belongsTo(Usuario,{foreignKey:'Id_User_FK', targetKey: 'Id_User'})

Usuario.hasMany(Certificado, {as: 'Usuario', foreignKey: 'Id_User_FK' });
Certificado.belongsTo(Usuario, {foreignKey: 'Id_User_FK', targetKey: 'Id_User'});

Usuario.hasMany(Inscripcione,{ as: 'inscripciones' ,foreignKey: 'Id_User_FK'})
Inscripcione.belongsTo(Usuario,{foreignKey: 'Id_User_FK', targetKey: 'Id_User'});

Usuario.hasMany(Resultados_Evaluacione, {foreignKey: 'Id_User_FK'})
Resultados_Evaluacione.belongsTo(Usuario,{foreignKey:'Id_User_FK', targetKey:'Id_User'});

Usuario.hasMany(Cursos, {foreignKey:'Id_Inst'})
Cursos.belongsTo(Usuario,{foreignKey: 'Id_Inst',targetKey:'Id_User'})

Usuario.hasMany(notificaciones_usuarios,{foreignKey: 'Id_User_FK'})
notificaciones_usuarios.belongsTo(Usuario, {foreignKey: 'Id_User_FK', targetKey:'Id_User'})
