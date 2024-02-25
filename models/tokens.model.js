import { connection } from "../db.js"
import { response } from "../Resources/responses.js";

//insertar tokens en la base de datos
export const InserTokens = (res, datos, tipo = 2) =>{

    return new Promise ((resolve, reject)=>{
        connection.query("INSERT INTO tokens (Token,Fec_Caducidad, User_Id_FK, Tipo_token) VALUES (?,?,?,?)", [datos.codigo, datos.exp, datos.Id_User, tipo], (err, resul) => {
            if (err) {
                 const objError = {
                    errno: err.errno
                }
                reject(objError);
            }
            else{
                resolve(resul);
            }
        })
    })
   
}

//verificar tokens de usuario
export const VerEmailToken = (res, datos)=>{
    
    return new Promise((resolve, reject)=>{
        connection.query("SELECT * FROM tokens WHERE User_Id_FK = ? AND Token = ?", [datos.Id_User, datos.codigo], (err, results) => {
            if (err) {
                 const objError = {
                    errno: err.errno
                }
                reject(objError);
            }else{

                resolve(results);
            }
        
        })
    })
}