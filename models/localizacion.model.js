import { connection } from "../db.js"
import { response } from "../Resources/responses.js";

//insertar localizacion
export const InsertLocation = (res, datos)=>{
    return new Promise ((resolve,reject)=>{

        connection.query("INSERT INTO localizacion (Dir_Ip,Id_User_FK) VALUES (?,?)", [datos.Dir_Ip, datos.Id_User], (err, result) => {
            if (err) {
                response(res, 500, 104, "Something went wrong");
    
            }else{
                
                resolve(result);
            }
        })
    })
   
}

//verificar ip de usuario
export const VerifyUserIp = (res, datos)=>{
    return new Promise((resolve,reject)=>{
        connection.query("SELECT * FROM localizacion WHERE Id_User_FK = ? AND Dir_Ip = ? ", [datos.Id_User, datos.Dir_Ip], (err, resul) => {
            if (err) {
                response(res, 500, 104, "Something went wrong");
            } else{
                resolve(resul);
            }
        })
    })
}

