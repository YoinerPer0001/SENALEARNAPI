import { check } from "express-validator";
import { validateResult } from "../utils/validateResult.js";


export const createValidation = [
    check('Respuestas')
        .exists().withMessage('Respuestas is required')
        .not().isEmpty().withMessage('Respuestas cannot be empty')
        .isArray().withMessage('Respuestas must be a array')
        .custom((value, { req }) => {

            value.forEach(respuesta => {
                console.log(typeof respuesta.Resp_Correcta_Eval)
                if (typeof respuesta.Text_Resp_Eval != 'string' || respuesta.Text_Resp_Eval == "") {
                    throw new Error('Text_Resp_Eval not valid');
                } else if (typeof respuesta.Resp_Correcta_Eval != 'number') {
                    throw new Error('Resp_Correcta_Eval not valid');
                }
            });

            return true


        }),
    check('Id_Preg_Eval')
        .exists().withMessage('Id_Preg_Eval is required')
        .not().isEmpty().withMessage('Id_Preg_Eval cannot be empty')
        .isString().withMessage('Id_Preg_Eval must be a string')
        .isLength({ max: 100 }).withMessage('Id_Preg_Eval must be at most 100 characters long')
    ,
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

export const UpdateValidation = [
    check('Text_Resp_Eval')
        .optional().not().isEmpty().withMessage('Text_Resp_Eval cannot be empty')
        .isString().withMessage('Text_Resp_Eval must be a string')
        .isLength({ max: 100 }).withMessage('Text_Resp_Eval must be at most 100 characters long'),
    check('Resp_Correcta_Eval')
        .optional().not().isEmpty().withMessage('Resp_Correcta_Eval cannot be empty')
        .isNumeric().withMessage('Resp_Correcta_Eval must be a string')
        .isLength({ max: 1 }).withMessage('Resp_Correcta_Eval must be at most 1 characters long'),
    check('Id_Preg_Eval')
        .optional().not().isEmpty().withMessage('Id_Preg_Eval cannot be empty')
        .isString().withMessage('Id_Preg_Eval must be a string')
        .isLength({ max: 100 }).withMessage('Id_Preg_Eval must be at most 100 characters long'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]
