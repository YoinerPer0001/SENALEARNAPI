import { connection } from "../db.js"
import { response } from "../Resources/responses.js";

export const getRolById = (res, id)=>{
  
    return new Promise ((resolve, reject) =>{

        connection.query("SELECT * FROM roles WHERE Id_Rol = ?", [id],(err, results)=>{
            if(err){
               
                response(res, 500, 104, "Something went wrong");
            }else{
    
                resolve(results);
            }
        })
    })
   
}