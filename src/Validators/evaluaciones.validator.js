import { check } from "express-validator";
import { validateResult } from "../utils/validateResult.js";


export const createValidation = [
    check('Tit_Eva')
        .exists().withMessage('Tit_Eva is required')
        .not().isEmpty().withMessage('Tit_Eva cannot be empty')
        .isString().withMessage('Tit_Eva must be a string')
        .isLength({ max: 255 }).withMessage('Tit_Eva must be at most 255 characters long'),
    check('Des_Eva')
        .exists().withMessage('Des_Eva is required')
        .not().isEmpty().withMessage('Des_Eva cannot be empty')
        .isString().withMessage('Des_Eva must be a string'),
    check('Id_Module_Cur')
        .exists().withMessage('Id_Module_Cur is required')
        .not().isEmpty().withMessage('Id_Module_Cur cannot be empty')
        .isString().withMessage('Id_Module_Cur must be a string')
        .isLength({ max: 100 }).withMessage('Id_Module_Cur must be at most 100 characters long'),
    check('Nota_Min_Apro')
        .exists().withMessage('Nota_Min_Apro is required')
        .not().isEmpty().withMessage('Nota_Min_Apro cannot be empty')
        .isNumeric().withMessage('Nota_Min_Apro must be a number')
        .isLength({ max: 6 }).withMessage('Nota_Min_Apro must be at most 6 characters long'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

export const UpdateValidation = [
    check('Tit_Eva')
        .optional().not().isEmpty().withMessage('Tit_Eva cannot be empty')
        .isString().withMessage('Tit_Eva must be a string')
        .isLength({ max: 255 }).withMessage('Tit_Eva must be at most 255 characters long'),
    check('Des_Eva')
        .optional().not().isEmpty().withMessage('Des_Eva cannot be empty')
        .isString().withMessage('Des_Eva must be a string'),
    check('Id_Module_Cur')
        .optional().not().isEmpty().withMessage('Id_Module_Cur cannot be empty')
        .isString().withMessage('Id_Module_Cur must be a string')
        .isLength({ max: 100 }).withMessage('Id_Module_Cur must be at most 100 characters long'),
    check('Nota_Min_Apro')
        .optional().not().isEmpty().withMessage('Nota_Min_Apro cannot be empty')
        .isNumeric().withMessage('Nota_Min_Apro must be a number')
        .isLength({ max: 6 }).withMessage('Nota_Min_Apro must be at most 6 characters long'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]
