import { check } from "express-validator";
import { validateResult } from "../utils/validateResult.js";

export const createValidation = [
    check('objetivos')
        .exists().withMessage('objetivos is required')
        .not().isEmpty().withMessage('objetivos cannot be empty')
        .isArray().withMessage('objetivos must be a array of objects')
        .custom((value, {req} ) =>{
            if(value){
                value.forEach(objetivo => {
                    if(!objetivo.Desc_Objetivo){
                            throw new Error('Desc_Objetivo is required')
                    }
                });
            }
            return true
        }),
    check('Id_Cur')
        .exists().withMessage('Id_Cur is required')
        .not().isEmpty().withMessage('Id_Cur cannot be empty')
        .isString().withMessage('Id_Cur must be a string')
        .isLength({ max: 100 }).withMessage('max length is 100'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

export const UpdateValidation = [
    check('Desc_Objetivo')
        .optional()
        .not().isEmpty().withMessage('Desc_Objetivo cannot be empty')
        .isString().withMessage('Desc_Objetivo must be a string')
        .isLength({ max: 255 }).withMessage('max length is 255'),
    check('Id_Cur')
        .optional()
        .not().isEmpty().withMessage('Id_Cur cannot be empty')
        .isString().withMessage('Id_Cur must be a string')
        .isLength({ max: 100 }).withMessage('max length is 100'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]
