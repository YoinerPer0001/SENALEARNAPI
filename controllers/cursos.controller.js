import { connection } from "../db.js"

// get all courses
export const getCursos = async (req, res) => {

    try {
        connection.query('SELECT * FROM cursos', (err, results, fields) => {
            if (err) {
                return res.status(500).json({
                    result: 104,
                    err: err
                })

            } else {

                res.status(200).json({
                    result: 200,
                    data: results
                })
            }

        })

    } catch (error) {
        res.status(400).json({
            result: 102,
            message: "Something went wrong"
        });
    }


}

// get all courses by category
export const getCuCat = async (req, res) => {

    try {
        const categoria = req.params.id;
        connection.query("SELECT * FROM CURSOS WHERE Id_Cat_FK = ? ", [categoria], (err, result) => {
            if (err) {
                return res.status(500).json({
                    result: 104,
                    err: err
                })
            } else {
                res.status(200).json({
                    result: 200,
                    data: result
                })
            }

        });
    } catch (error) {

        res.status(400).json({
            result: 102,
            message: "Something went wrong"
        })
    }

}

//CREATE A NEW COURSE
export const CreateCourse = async (req, res) => {
    
    try {

        const { Nom_Cur, Des_Cur, Hor_Cont_Total, Fech_Crea_Cur, Id_Cat_FK, Fot_Cur } = req.body;
        const data = req.body;
        //verify complete data

        if (!Nom_Cur || !Des_Cur || !Hor_Cont_Total || !Fech_Crea_Cur || !Id_Cat_FK || !Fot_Cur) {
            return res.status(404).json({
                result: 104,
                message: "Datos incompletos o incorrectos"
            })
        } else {
            return res.status(200).json({
                result: 200,
                data: data
            })
        }
    } catch (ex) {

    }
}

