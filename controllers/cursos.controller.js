import { connection } from "../db.js"

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