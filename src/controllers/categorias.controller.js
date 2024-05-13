import 'dotenv/config'
import uniqid from 'uniqid';
import { response } from "../utils/responses.js";
import { Categorias } from "../models/categorias.model.js";
import { Cursos } from '../models/cursos.model.js';


//get all categories
export const GetCategories = async (req, res) => {

    try {

        const categorias = await Categorias.findAll({
            where:{ ESTADO_REGISTRO: 1},
            attributes: {exclude:['updatedAt', 'createdAt']}
        });

        if (categorias.length > 0) {
            response(res, 200, 200, categorias);
        } else {
            response(res, 404);
        }

    } catch (error) {

        response(res, 500, 500, error);
    }

}

//get  category by id
export const GetCategoriesxId = async (req, res) => {

    try {
        const { id } = req.params;

        const categoria = await Categorias.findByPk(id, {attributes: {exclude:['updatedAt', 'createdAt']}})

        if (categoria) {
            response(res, 200, 200, categoria);
        } else {
            response(res, 404);
        }

    } catch (err) {

        response(res, 500, 500, "something went wrong");
    }

}

// create categories
export const createCategories = async (req, res) => {

    try {

        const Id_Cat = uniqid();

        const { Nom_Cat } = req.body;

        //verificamos que no exista una categoria con el mismo nombre
        const categoriaExists = await Categorias.findOne({ where: { Nom_Cat: Nom_Cat.toLowerCase() } })

        if (categoriaExists) {

            response(res, 500, 107, "category already exist");

        } else {

            //create category
            const datos = {
                Id_Cat: Id_Cat,
                Nom_Cat: Nom_Cat.toLowerCase()
            }

            const newCategory = await Categorias.create(datos);
            if (newCategory) {
                response(res, 200);
            } else {
                response(res, 500, 500, "error creating category");
            }

        }

    } catch (err) {

        response(res, 500, 500, "something went wrong");
    }

}

//update categorias
export const UpdateCategories = async (req, res) => {
    try {

        //Data
        const { id } = req.params;
        const { Nom_Cat } = req.body;

        //verify exist category

        const category = await Categorias.findByPk(id)

        if (!category) {

            response(res, 404, 404, "Category not found");

        } else {
            //verificamos que no exista la nueva category
            const categorie = await Categorias.findOne({ where: { Nom_Cat: Nom_Cat.toLowerCase() } })

            if (categorie) {
                response(res, 409, 409, "category already exist");
            } else {

                const datos = {
                    Nom_Cat: Nom_Cat.toLowerCase()
                }

                const responses = await Categorias.update(datos, { where: { Id_Cat: id } })
                if (responses) {
                    response(res, 200);
                } else {
                    response(res, 500, 500, "error updating category");
                }
            }

        }

    } catch (err) {
        response(res, 500, 500, "something went wrong");
    }


}

export const deleteCat = async (req, res) => {
    try{

        const {id} = req.params

        const category = await Categorias.findByPk(id)
        if(category){
        //verify that category dont have courses asociated
        const courses = await Cursos.findAll({where:{Id_Cat_FK: id}})
            console.log(courses)
        if(courses.length > 0){
            response(res, 409, 409, "category have courses asociated");
        }else{
            const responses = await Categorias.update({ESTADO_REGISTRO: 0},{where:{Id_Cat: id}})
            if(responses){
                response(res, 200);
            }else{
                response(res, 500, 500, "error deleting category");
            }
        }

        }else{
            response(res, 404, 404, "Category not found");
        }

    }catch (err) {
        response(res, 500, 500, err);
    }
}

