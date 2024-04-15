import { check } from "express-validator";
import { validateResult } from "../utils/validateResult.js";


export const createValidation = [
    check('Id_Cont')
        .exists().withMessage('Id_Cont is required')
        .not().isEmpty().withMessage('Id_Cont cannot be empty')
        .isString().withMessage('Id_Cont must be a string')
        .isLength({ max: 100 }).withMessage('Id_Cont must be at most 100 characters long'),
    check('Fech_Visualizacion')
        .exists().withMessage('Fech_Visualizacion is required')
        .not().isEmpty().withMessage('Fech_Visualizacion cannot be empty')
        .isString().withMessage('Fech_Visualizacion must be a string')
        .isLength({ max: 100 }).withMessage('Fech_Visualizacion must be at most 100 characters long'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

export const UpdateValidation = [
    check('Id_Cont')
        .optional().not().isEmpty().withMessage('Id_Cont cannot be empty')
        .isString().withMessage('Id_Cont must be a string')
        .isLength({ max: 100 }).withMessage('Id_Cont must be at most 100 characters long'),
    check('New_Cont')
        .optional().not().isEmpty().withMessage('New_Cont cannot be empty')
        .isString().withMessage('New_Cont must be a string')
        .isLength({ max: 100 }).withMessage('New_Cont must be at most 100 characters long'),
    check('Fech_Visualizacion')
        .optional().not().isEmpty().withMessage('Fech_Visualizacion cannot be empty')
        .isString().withMessage('Fech_Visualizacion must be a string')
        .custom((value, { req }) => {
            if (value) {
                const valueSplit = value.split('-')
                if (valueSplit.length != 3) {
                    throw new Error('Date not valid');
                } else {
                    return true;
                }
            }
        }),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]
