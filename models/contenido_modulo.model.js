import { connection } from "../db.js";

//obtener contenido de los modulos por el id del modulo
export const GetContModxIdMod = (id) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM contenido_modulo WHERE Id_Mod_FK = ?", [id], (err, result) => {

            if (err) {
                const objError = {
                    errno: err.errno
                }
                reject(objError);
            } else {
                resolve(result);
            }

        })
    })
}

//obtener contenido de los modulos por el id del modulo
export const GetContModxId = (id) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM contenido_modulo WHERE Id_Cont = ?", [id], (err, result) => {

            if (err) {
                const objError = {
                    errno: err.errno
                }
                reject(objError);
            } else {
                resolve(result);
            }

        })
    })
}


//crear cont modulo
export const createContModules = (datos) => {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO contenido_modulo (Id_Cont,Tip_Cont, Url_Cont,Tit_Cont, Id_Mod_FK) VALUES (?,?,?,?,?)", [datos.Id_Cont, datos.Tip_Cont, datos.Url_Cont, datos.Tit_Cont, datos.Id_Mod_FK], (err, results) => {

            if (err) {
                const objError = {
                    errno: err.errno
                }
                reject(objError);

            } else {
                resolve(results);
            }

        })
    })
}


//actualizar contenido del modulo
export const updateContMod = (datos) => {
    return new Promise((resolve, reject) => {

        connection.query("UPDATE contenido_modulo SET Tip_Cont = ?, Url_Cont = ?,Tit_Cont =?, Id_Mod_FK=? WHERE Id_Cont = ?",
            [datos.Tip_Cont,datos.Url_Cont,datos.Tit_Cont,datos.Id_Mod_FK, datos.Id_Cont], (err, result) => {
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