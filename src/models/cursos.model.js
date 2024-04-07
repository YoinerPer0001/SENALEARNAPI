import { sequelize } from "../database/db.js";
import { DataTypes } from "sequelize";
import { Objetivos_Cursos } from "./objetivos_cursos.model.js";
import { Modulocurso } from "./modulos_cursos.model.js";

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
        allowNull: false
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
        allowNull: false
    },
    Est_Cur:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Id_Inst:{
        type: DataTypes.STRING,
        allowNull: false
    }

})

Cursos.hasMany(Objetivos_Cursos,{foreignKey: 'Id_Cur_FK'})
Objetivos_Cursos.belongsTo(Cursos,{foreignKey: 'Id_Cur_FK',targetKey:'Id_Cur'})

Cursos.hasMany(Modulocurso,{foreignKey: 'Id_Cur_FK'})
Modulocurso.belongsTo(Cursos,{foreignKey: 'Id_Cur_FK', targetKey:'Id_Cur'})