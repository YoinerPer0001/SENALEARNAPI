import { check } from "express-validator";
import { validateResult } from "../utils/validateResult.js";


export const createValidation = [
    check('Text_Preg_Eval')
        .exists().withMessage('Text_Preg_Eval is required')
        .not().isEmpty().withMessage('Text_Preg_Eval cannot be empty')
        .isString().withMessage('Text_Preg_Eval must be a string'),

    check('Id_Eval')
        .exists().withMessage('Id_Eval is required')
        .not().isEmpty().withMessage('Id_Eval cannot be empty')
        .isString().withMessage('Id_Eval must be a string')
        .isLength({ max: 100 }).withMessage('Id_Eval must be at most 100 characters long'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

export const UpdateValidation = [
    check('Text_Preg_Eval')
        .optional().not().isEmpty().withMessage('Text_Preg_Eval cannot be empty')
        .isString().withMessage('Text_Preg_Eval must be a string'),
    check('Id_Eval')
        .optional().not().isEmpty().withMessage('Id_Eval cannot be empty')
        .isString().withMessage('Id_Eval must be a string')
        .isLength({ max: 100 }).withMessage('Id_Eval must be at most 100 characters long'),
     (req, res, next) => {
        validateResult(req, res, next)
    }
]
