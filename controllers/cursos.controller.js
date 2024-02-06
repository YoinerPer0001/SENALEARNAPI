import { connection } from "../db.js"
import { InstPermissions } from "../managePermissions/manage.permissions.js"

// get all courses
export const getCursos = async (req, res) => {

    try {
        connection.query('SELECT * FROM cursos WHERE Est_Cur = ?', [1],(err, results, fields) => {
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
        connection.query("SELECT * FROM CURSOS WHERE Id_Cat_FK = ? AND Est_Cur = ?", [categoria, 1], (err, result) => {
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

        const { Id_User, Nom_Cur, Des_Cur, Hor_Cont_Total, Fech_Crea_Cur, Id_Cat_FK, Fot_Cur } = req.body;
        const data = req.body;
        //verify complete data

        if (!Id_User || !Nom_Cur || !Des_Cur || !Hor_Cont_Total || !Fech_Crea_Cur || !Id_Cat_FK || !Fot_Cur) {
            return res.status(400).json({
                result: 102,
                message: "Datos incompletos o incorrectos"
            })
        } else {

            //verify user exist and rol

            connection.query("SELECT * from usuarios WHERE Id_User = ? ", [Id_User], (err, result) => {

                if (err) {
                    return res.status(500).json({
                        result : 500,
                        message : "something went wrong"
                    })

                }else if(result.length < 1){

                    return res.status(204).json({

                    })
                }


                //verify permissions
                const permiso = InstPermissions(result[0].Id_Rol_FK);

                if (permiso) {
                
                const Est_Cur = 0;
                connection.query("INSERT INTO cursos (Nom_Cur,Des_Cur,Hor_Cont_Total, Fech_Crea_Cur,Id_Cat_FK, Est_Cur, Fot_Cur) VALUES (?,?,?,?,?,?,?)",[Nom_Cur, Des_Cur, Hor_Cont_Total, Fech_Crea_Cur, Id_Cat_FK, Est_Cur, Fot_Cur], (err, result)=>{

                        if (err) {
                            return res.status(500).json({
                                result : 500,
                                message : "something went wrong"
                            })
                        }

                        return res.status(200).json({
                            result: 200,
                            data : result
                        })


                    })

                }else{
                    res.status(401).json({
                        result : 401,
                        message: "You don't have permissions"
                    })
                }

            })


        }
    } catch (ex) {

    }
}

