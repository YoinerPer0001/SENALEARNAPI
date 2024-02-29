import { connection } from "../db.js"
import { response } from "../Resources/responses.js";

//insertar localizacion
export const InsertLocation = (datos)=>{
    return new Promise ((resolve,reject)=>{

        connection.query("INSERT INTO localizacion (Dir_Ip,Id_User_FK) VALUES (?,?)", [datos.Dir_Ip, datos.Id_User], (err, results) => {
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

//verificar ip de usuario
export const VerifyUserIp = (datos)=>{
    return new Promise((resolve,reject)=>{
        connection.query("SELECT * FROM localizacion WHERE Id_User_FK = ? AND Dir_Ip = ? ", [datos.Id_User, datos.Dir_Ip], (err, results) => {
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

//obtener todas las localizaciones
export const getAllLoc = () => {
    return new Promise((resolve, reject) => {

        connection.query("SELECT * FROM localizacion", (err, result) => {
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


//obtener todas las localizaciones de usuarios
export const getAllLocUsers = (id) => {
    return new Promise((resolve, reject) => {

        connection.query("SELECT * FROM localizacion WHERE Id_User_FK = ?",[id], (err, result) => {
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