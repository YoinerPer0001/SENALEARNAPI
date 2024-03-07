import { connection } from "../db.js"
import { response } from "../Resources/responses.js";

//insertar opciones -- OK
export const InsertOption = async (name) => {
    return new Promise((resolve, reject) => {

        connection.query("INSERT INTO opciones (nombre_opcion) VALUES (?)", [name], (err, results) => {
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

//obtener todas las opciones -- OK
export const getAllOpciones = async() => {
    return new Promise((resolve, reject) => {

        connection.query("SELECT * FROM opciones", (err, result) => {
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

//obtener opciones por id -- OK
export const getOptionById = async (id) => {
    return new Promise((resolve, reject) => {

        connection.query("SELECT * FROM opciones WHERE id_opcion = ?", [id], (err, result) => {
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

//obtener opciones por nombre -- OK
export const GetOpcionxName = async (name) => {
    return new Promise((resolve, reject) => {

        connection.query("SELECT * FROM opciones WHERE nombre_opcion = ?", [name], (err, result) => {
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


//actualizar locations
export const updateOption = async (datos) => {

    return new Promise((resolve, reject) => {
        
        connection.query("UPDATE opciones SET nombre_opcion = ? WHERE id_opcion = ?",
            [datos.nombre_opcion, datos.id_opcion], (err, result) => {

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

