import { connection } from "../db.js"
import { response } from "../Resources/responses.js";

export const getRolById = ( id)=>{
  
    return new Promise ((resolve, reject) =>{

        connection.query("SELECT * FROM roles WHERE Id_Rol = ?", [id],(err, results)=>{
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