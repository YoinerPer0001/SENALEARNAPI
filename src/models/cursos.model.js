import { sequelize } from "../database/db.js";
import { DataTypes } from "sequelize";
import { Objetivos_Cursos } from "./objetivos_cursos.model.js";
import { Modulocurso } from "./modulos_cursos.model.js";
import { Certificado } from "./cerificados.model.js";
import { Inscripcione } from "./inscripciones.model.js";
import { Requisitos_previo } from "./requisitos_previos.model.js";
import { Usuario } from "./users.model.js";

export const Cursos = sequelize.define('Cursos',{
    Id_Cur:{
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    Nom_Cur:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Des_Cur:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Hor_Cont_Total:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    Fech_Crea_Cur:{
        type: DataTypes.DATE,
        allowNull: false
    },
    Id_Cat_FK:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Fot_Cur:{
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    Est_Cur:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Id_Inst:{
        type: DataTypes.STRING,
        allowNull: false
    },
    ESTADO_REGISTRO:{
        type: DataTypes.INTEGER,
        defaultValue:1,
        allowNull: false
    }

})

Cursos.hasMany(Objetivos_Cursos,{foreignKey: 'Id_Cur_FK'})
Objetivos_Cursos.belongsTo(Cursos,{foreignKey: 'Id_Cur_FK',targetKey:'Id_Cur'})

Cursos.hasMany(Modulocurso,{foreignKey: 'Id_Cur_FK'})
Modulocurso.belongsTo(Cursos,{foreignKey: 'Id_Cur_FK', targetKey:'Id_Cur'})

Cursos.hasMany(Certificado, {as: 'Curso', foreignKey: 'Id_Cur_FK'});
Certificado.belongsTo(Cursos,{foreignKey:'Id_Cur_FK', targetKey:'Id_Cur'});

Cursos.hasMany(Inscripcione,{foreignKey: 'Id_Cur_FK'})
Inscripcione.belongsTo(Cursos,{foreignKey: 'Id_Cur_FK',targetKey:'Id_Cur'});

Cursos.hasMany(Requisitos_previo,{foreignKey: 'Id_Cur_FK'})
Requisitos_previo.belongsTo(Cursos,{foreignKey: 'Id_Cur_FK',targetKey:'Id_Cur'})

