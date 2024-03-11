import { connection } from "../database/db.js";

//obtener todas los objetivos x curso

export const GetObjxCourses = (id) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM objetivos_cursos WHERE Id_Cur_FK = ?", [id], (err, results) => {

            if (err) {
            
                const objError = {
                    errno: err.errno,
                    code: err.code
                }
                reject(objError);
            }
            else {
                resolve(results)
            }

        })
    })
}

//crear objetivos de cursos
export const CreateObjCourse = ( datos) => {
 
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO objetivos_cursos (Id_Objetivo, Desc_Objetivo, Id_Cur_FK) VALUES (?,?,?)", [datos.Id_Objetivo, datos.Desc_Objetivo,datos.Id_Cur_FK], (err, results) => {

            if (err) {
            
                const objError = {
                    errno: err.errno,
                    code: err.code
                }
                reject(objError);
            }
            else {
                resolve(results)
            }

        })
    })
}

//obtener objetivos por ID
export const GetObjxId= ( id) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM objetivos_cursos WHERE Id_Objetivo = ?", [id], (err, results) => {

            if (err) {
            
                const objError = {
                    errno: err.errno,
                    code: err.code
                }
                reject(objError);
            }
            else {
                resolve(results)
            }

        })
    })
}


//actualizar objetivoss
export const UpdateObjCourses = (datos) => {
    return new Promise((resolve, reject) => {

        connection.query("UPDATE objetivos_cursos SET Desc_Objetivo= ?, Id_Cur_FK = ? WHERE Id_Objetivo = ?",
            [datos.Desc_Objetivo, datos.Id_Cur_FK, datos.Id_Objetivo], (err, results) => {
                if (err) {
            
                    const objError = {
                        errno: err.errno,
                        code: err.code
                    }
                    reject(objError);
                }
                else {
                    resolve(results)
                }

            });
    })
}

