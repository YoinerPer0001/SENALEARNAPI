import {connection} from "../db.js"
import { response } from "../Resources/responses.js"

//get all courses published
export const getAllCourses = (res)=>{
    return new Promise((resolve, reject)=>{
        
        connection.query('SELECT * FROM cursos WHERE Est_Cur = ?', [2], (err, results, fields) => {
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

// get all courses published by category
export const getAllCoursesxCat = (res, id_Cat)=>{
    return new Promise((resolve,reject)=>{
        connection.query("SELECT * FROM CURSOS WHERE Id_Cat_FK = ? AND Est_Cur = ?", [id_Cat, 2], (err, result) => {
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

//create a new course

export const createNewCourse = (res,datos)=>{
    return new Promise((resolve,reject)=>{
        connection.query("INSERT INTO cursos (Id_Cur, Nom_Cur,Des_Cur,Hor_Cont_Total, Fech_Crea_Cur,Id_Cat_FK, Est_Cur, Fot_Cur) VALUES (?,?,?,?,?,?,?,?)", [datos.Id_Cur, datos.Nom_Cur, datos.Des_Cur, datos.Hor_Cont_Total, datos.Fech_Crea_Cur, datos.Id_Cat_FK, datos.Est_Cur, datos.Fot_Cur], (err, result) => {

            if (err) {
                response(res,500,104,"Something went wrong");
            }else{

                resolve(result);
            }

           
        })
    })
}

export const CoursesUpdate = (res, objDatos)=>{
    return new Promise((resolve,reject)=>{
        connection.query("UPDATE cursos SET Nom_Cur= ? , Des_Cur = ?, Hor_Cont_Total = ?, Fech_Crea_Cur = ? , Id_Cat_FK = ? , Fot_Cur = ? WHERE Id_Cur = ?",
        [objDatos.Nom_Cur, objDatos.Des_Cur, objDatos.Hor_Cont_Total, objDatos.Fech_Crea_Cur, objDatos.Id_Cat_FK, objDatos.Fot_Cur, objDatos.id], (err, result) => {
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

export const verifyExistCurso = (res,id) => {

    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM cursos WHERE Id_Cur = ?", [id], (err, result) => {
            if (err) {

                 const objError = {
                    errno: err.errno
                }
                reject(objError);

            } else if (result.length < 1) {

                response(res, 500, 204, "course don't exist");

            } else {

                resolve(result[0]);
            }
        })
    })

}

// get all courses published by id
export const getCoursesxId = (id)=>{
    return new Promise((resolve,reject)=>{
        connection.query("SELECT * FROM CURSOS WHERE Id_Cur = ? ", [id], (err, result) => {
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