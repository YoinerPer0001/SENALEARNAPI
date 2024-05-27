import { check } from "express-validator";
import { validateResult } from "../utils/validateResult.js";


export const createValidation = [

    check('Id_User')
        .exists().withMessage('Id_User is required')
        .not().isEmpty().withMessage('Id_User cannot be empty')
        .isString().withMessage('Id_User must be a string')
        .isLength({ max: 100 }).withMessage('Id_User must be at most 100 characters long'),
    check('Tipo_token')
        .exists().withMessage('Tipo_token is required')
        .not().isEmpty().withMessage('Tipo_token cannot be empty')
        .isString().withMessage('Tipo_token must be a string')
        .isLength({ max: 100 }).withMessage('Tipo_token must be at most 100 characters long'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

export const UpdateValidation = [
    check('Tokens')
        .optional().not().isEmpty().withMessage('Tokens cannot be empty')
        .isString().withMessage('Tokens must be a string')
        .isLength({ max: 100 }).withMessage('Tokens must be at most 100 characters long'),
    check('Fec_Caducidad')
        .optional().not().isEmpty().withMessage('Fec_Caducidad cannot be empty')
        .isString().withMessage('Fec_Caducidad must be a string')
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
    check('Id_User')
        .optional().not().isEmpty().withMessage('Id_User cannot be empty')
        .isString().withMessage('Id_User must be a string')
        .isLength({ max: 100 }).withMessage('Id_User must be at most 100 characters long'),
    check('Tipo_token')
        .optional().not().isEmpty().withMessage('Tipo_token cannot be empty')
        .isString().withMessage('Tipo_token must be a string')
        .isLength({ max: 100 }).withMessage('Tipo_token must be at most 100 characters long'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]
