import { connection } from "../db.js"


export const getModulexCourse = async (id_course) => {

    const url = "SELECT * FROM modulocurso WHERE Id_Cur_FK = ?";
    return new Promise((resolve, reject) => {

        connection.query(url, [id_course], (err, results) => {
            if (err) {
                const objError = {
                    errno: err.errno,
                    code: err.code
                }
                reject(objError);
            } else {
                resolve(results);
            }
        })
    })

}

export const createModule = async (datos) => {

    const {Id_Mod, Tit_Mod, Est_Mod, Id_Cur_FK, Horas_Cont_Mod} = datos;

    const url = "INSERT INTO modulocurso (Id_Mod, Tit_Mod, Est_Mod, Id_Cur_FK, Horas_Cont_Mod) VALUES (?,?,?,?,?)";
    return new Promise((resolve, reject) => {

        connection.query(url, [Id_Mod, Tit_Mod, Est_Mod, Id_Cur_FK, Horas_Cont_Mod], (err, results) => {
            if (err) {
               
                const objError = {
                    errno: err.errno,
                    code: err.code
                }
                reject(objError);
            } else {
                resolve(results);
            }
        })
    })

}


export const getModulexId = async (Id_Mod) => {

    const url = "SELECT * FROM modulocurso WHERE Id_Mod = ?";
    return new Promise((resolve, reject) => {

        connection.query(url, [Id_Mod], (err, results) => {
            if (err) {
                const objError = {
                    errno: err.errno,
                    code: err.code
                }
                reject(objError);
            } else {
                resolve(results);
            }
        })
    })

}

export const UpdateCurModules = (datos) => {
    return new Promise((resolve, reject) => {

        connection.query("UPDATE modulocurso SET Tit_Mod= ?,Est_Mod=?,Id_Cur_FK=?,Horas_Cont_Mod=? WHERE Id_Mod = ?",
            [datos.Tit_Mod,datos.Est_Mod,datos.Id_Cur_FK,datos.Horas_Cont_Mod, datos.Id_Mod], (err, result) => {
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