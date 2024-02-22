import { connection } from "../db.js"
import { response } from "../Resources/responses.js";


//Obtener todos los usuario
export const getAllUsers = (res) => {

    connection.query('SELECT * FROM usuarios', (err, results, fields) => {
        if (err) {

            response(res, 500, 104, results);

        } else {

            response(res, 200, 200, results);
        }

    })
}

//Obtener usuario por Email
export const UserByEmail = async (res, Ema_User) => {
    return new Promise((resolve,reject)=>{

        connection.query("SELECT * FROM usuarios WHERE Ema_User = ?", [Ema_User], (err, results) => {
            if (err) {
                response(res, 500, 104, "Something went wrong");
            }
    
            resolve(results);
    
        })

    })
}

//Regitrar Usuarios
export const InsertUsers = (res, datos) => {

    const { Nom_User, Ape_User, Ema_User, passEncripted, Id_Rol_FK } = datos;

    return new Promise ((resolve, reject)=>{

        connection.query("INSERT INTO usuarios (Nom_User,Ape_User,Ema_User,Pass_User,Id_Rol_FK, Est_Email_User) VALUES (?,?,?,?,?,?)", [Nom_User, Ape_User, Ema_User, passEncripted, Id_Rol_FK, 0], (err, results, fields) => {
            if (err) {
              
                response(res, 500, 104, "Something went wrong");
    
            } else {
    
                resolve(results);
            }
        })
    })
}


//seleccionar usuarios por id
export const GetUserbyId = (res, id)=>{
   
    return new Promise ((resolve,reject)=>{
        connection.query("SELECT * FROM USUARIOS WHERE Id_User = ?", [id], (err, results) => {
            if (err) {
                response(res, 500, 104, "Something went wrong");
            }else{
                resolve(results);
            }

        })
    })
}

//actualizar estado email a verificado
export const UpdateEstEmail = (res,id)=>{
    return new Promise((resolve,reject)=>{
        connection.query("UPDATE usuarios SET Est_Email_User = ? WHERE Id_User = ?", [1, id], (err, results) => {
            if (err) {
                response(res, 500, 104, "Something went wrong");
            }
            else{
                resolve(results)
            }
        })
    })
}

//verificar existencia tanto por email o por nombre de usuario
export const getUserByEmailUser = (res,campoV, valor)=>{
    return new Promise((resolve,reject)=>{

        connection.query(`SELECT * FROM usuarios WHERE ${campoV} = ?`, [valor], async (err, results, fields) => {
            if (err) {
                response(res, 500, 104, "Something went wrong");
            }else{
                resolve(results);
            }
        })
    })
}