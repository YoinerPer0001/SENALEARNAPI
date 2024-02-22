import { connection } from "../db.js";
import { response } from "../Resources/responses.js";

//obtener todas las categorias
export const getAllCat = (res) => {
    return new Promise((resolve, reject) => {

        connection.query("SELECT * FROM categorias", (err, result) => {
            if (err) {
                response(res, 500, 104, "Something went wrong");
            } else {

                resolve(result)
            }
        });
    })
}

//obtener categorias por nombre
export const GetCatxName = (res, Nom_Cat) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM categorias WHERE Nom_Cat = ?", [Nom_Cat], (err, result) => {

            if (err) {
                response(res, 500, 104, "Something went wrong");
            } else {
                resolve(result);
            }

        })
    })
}

//obtener categorias por ID
export const GetCatxId = (res, id) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM categorias WHERE Id_Cat = ?", [id], (err, result) => {

            if (err) {
                response(res, 500, 104, "Something went wrong");
            } else {
                resolve(result);
            }

        })
    })
}

//crear categorias
export const CreateCat = (res, datos) => {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO categorias (Id_Cat, Nom_Cat) VALUES (?,?)", [datos.Id_Cat, datos.Nom_Cat], (err, results) => {

            if (err) {

                response(res, 500, 104, "Something went wrong");

            } else {
                resolve(results);
            }

        })
    })
}

//actualizar categorias
export const UpdateCat = (res,datos) => {
    return new Promise((resolve, reject) => {

        connection.query("UPDATE categorias SET Nom_Cat= ? WHERE Id_Cat = ?",
            [datos.Nom_Cat, datos.id], (err, result) => {
                if (err) {
                    response(res, 500, 104, "Something went wrong");

                } else {
                    resolve(result);
                }

            });
    })
}

//eliminar categorias
export const deleteCat = (res,id) => {
    return new Promise((resolve, reject) => {
        connection.query("DELETE FROM categorias WHERE Id_Cat = ?", [id], (err, result) => {
            if (err) {

                response(res, 500, 104, err);

            } else {
                resolve(result);
               
            }
        })
    })
}
