import { Opcione } from '../models/opciones.model.js'
import 'dotenv/config'
import { response } from '../utils/responses.js';




//get all options -- OK
export const GetAllOptions = async (req, res) => {

    try {
        const { Id_Rol_FK } = req.Tokendata.user;

        const opciones = await Opcione.findAll();

        if (opciones) {
            response(res, 200, 200, opciones);
        } else {
            response(res, 404, 404, 'options not found');
        }

    } catch (error) {

        response(res, 500, 500, err);
    }

}

//get  options by id -- OK
export const GetOptionsById = async (req, res) => {

    try {

        const { id } = req.params;

        //verify exist user
        const option = await Opcione.findByPk(id)

        if (option) {

            response(res, 200, 200, option);

        } else {

            response(res, 404, 404, 'Options not found');

        }

    } catch (err) {

        response(res, 500, 500, "something went wrong");
    }


}

// create options
export const createOptions = async (req, res) => {


    try {

        const { nombre_opcion } = req.body;

        if (!nombre_opcion) {

            response(res, 400, 102, "Something went wrong");

        } else {
            const nombre_optLower = nombre_opcion.toLowerCase();

            //verificamos que no exista la opcion
            const option = await Opcione.findOne({ where: { nombre_opcion: nombre_optLower } });


            if (option) {

                response(res, 409, 409, "option is already registered");

            } else {

                const newOption = await Opcione.create({ nombre_opcion: nombre_optLower });

                if (newOption) {
                    response(res, 200);
                } else {
                    response(res, 500, 500, "error creating option");
                }

            }
        }

    } catch (err) {

        response(res, 500, 500, "something went wrong");
    }



}

//update options
export const UpdateOptions = async (req, res) => {

    try {

        //Data
        const { id } = req.params;
        const { nombre_opcion } = req.body;

        //verify exist option
        const option = await Opcione.findByPk(id)

        if (!option) {

            response(res, 401, 401, "Option not found");

        } else {
            const objDatos = {
                nombre_opcion: nombre_opcion.toLowerCase()
            }

            const responses = await Opcione.update(objDatos, { where: { id_opcion: id } })

            if (responses) {
                response(res, 200);
            } else {
                response(res, 500, 500, "Error updating option");
            }
        }

    } catch (err) {

        response(res, 500, 500, "something went wrong");

    }
}
