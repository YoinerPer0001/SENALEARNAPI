import { connection } from "../db.js";
import { response } from "../Resources/responses.js";

//obtener todas los objetivos x curso

export const GetObjxCourses = (id) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM objetivos_cursos WHERE Id_Cur_FK = ?", [id], (err, result) => {

            if (err) {
                reject(err);
            } else {
                resolve(result);
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
                    errno: err.errno
                }
                reject(objError);

            } else {
               
                resolve(results);
            }

        })
    })
}

//obtener objetivos por ID
export const GetObjxId= ( id) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM objetivos_cursos WHERE Id_Objetivo = ?", [id], (err, result) => {

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


//actualizar objetivoss
export const UpdateObjCourses = (datos) => {
    return new Promise((resolve, reject) => {

        connection.query("UPDATE objetivos_cursos SET Desc_Objetivo= ?, Id_Cur_FK = ? WHERE Id_Objetivo = ?",
            [datos.Desc_Objetivo, datos.Id_Cur_FK, datos.Id_Objetivo], (err, result) => {
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

//eliminar categorias
export const deleteCat = (res, id) => {
    return new Promise((resolve, reject) => {
        connection.query("DELETE FROM categorias WHERE Id_Cat = ?", [id], (err, result) => {
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