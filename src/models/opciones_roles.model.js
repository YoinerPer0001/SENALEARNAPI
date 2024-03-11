import { connection } from "../database/db.js";

export const AsignOptionRol = async (Id_Rol_fk,id_opcion_fk) => {

    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO roles_opciones (Id_Rol_fk, id_opcion_fk) VALUES (?,?) ",
            [Id_Rol_fk, id_opcion_fk], (err, result) => {
                if (err) {
                    const objError = {
                        errno: err.errno
                    }
                    reject(objError);
                } else {
                    resolve(result);
                }
            });
    });

}

export const getAsignation = async (Id_Rol_fk, id_opcion_fk)=>{
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM roles_opciones WHERE Id_Rol_fk = ? AND id_opcion_fk = ?",[Id_Rol_fk, id_opcion_fk], (err, result) => {
            if (err) {
                const objError = {
                    errno: err.errno
                }
                reject(objError);
            } else {
                resolve(result);
            }
        });
    })
}

export const getoptionsxRol = async (Id_Rol_fk)=>{
    return new Promise((resolve, reject) => {
        connection.query("SELECT id_opcion,nombre_opcion FROM roles_opciones INNER JOIN opciones ON id_opcion_fk = id_opcion WHERE Id_Rol_fk = ?", [Id_Rol_fk], (err, result) => {
            if (err) {
                const objError = {
                    errno: err.errno
                }
                reject(objError);
            } else {
                resolve(result);
            }
        });
    })
}

export const updateOptionRol = async (new_option_id, id_opcion_fk,Id_Rol_fk)=>{
    return new Promise((resolve, reject)=>{
        connection.query("UPDATE roles_opciones SET id_opcion_fk =? WHERE Id_Rol_fk =? AND id_opcion_fk =? ",[new_option_id,Id_Rol_fk,id_opcion_fk], (err, result) => {
            if (err) {
                const objError = {
                    errno: err.errno
                }
                reject(objError);
            } else {
                resolve(result);
            }
        });
    })
}
