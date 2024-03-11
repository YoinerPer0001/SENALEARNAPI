import { connection } from "../database/db.js";

//obtener todos los certificados
export const GetAllCert = ()=>{
    return new Promise((resolve, reject)=>{
        connection.query('SELECT * FROM certificados', (err, results, fields) => {
            if (err) {
                const objError = {
                    errno: err.errno,
                    code: err.code
                }
            }else{
                resolve(results);
            }
          
        })
    })
}

export const GetAllCertByUser = (id)=>{
    return new Promise((resolve, reject)=>{
        connection.query('SELECT * FROM certificados WHERE Id_User_FK = ?',[id], (err, results, fields) => {
            if (err) {
                const objError = {
                    errno: err.errno,
                    code: err.code
                }
            }else{
                resolve(results);
            }
          
        })
    })
}

export const GetAllCertByCourse = (id)=>{
    return new Promise((resolve, reject)=>{
        connection.query('SELECT * FROM certificados WHERE Id_Cur_FK =?',[id], (err, results, fields) => {
            if (err) {
                const objError = {
                    errno: err.errno,
                    code: err.code
                }
            }else{
                resolve(results);
            }
            
        })
    })
}