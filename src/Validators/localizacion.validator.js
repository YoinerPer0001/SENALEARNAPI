import { check } from "express-validator";
import { validateResult } from "../utils/validateResult.js";

export const createValidation = [
    check('Dir_Ip')
        .exists().withMessage('Dir_Ip is required')
        .not().isEmpty().withMessage('Dir_Ip cannot be empty')
        .isString().withMessage('Dir_Ip must be a string')
        .isLength({ max: 15 }).withMessage('max length is 15')
        .custom((value, { req }) => {
            if (value) {
                const valueSplit = value.split('.')
                if (valueSplit.length != 4) {
                    throw new Error('Ip not valid');
                } else {
                    return true;
                }
            }
        }),
    check('Id_User')
        .exists().withMessage('Id_User is required')
        .not().isEmpty().withMessage('Id_User cannot be empty')
        .isString().withMessage('Id_User must be a string')
        .isLength({ max: 100 }).withMessage('max length is 100'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

export const UpdateValidation = [
    check('Dir_Ip')
        .optional().not().isEmpty().withMessage('Dir_Ip cannot be empty')
        .isString().withMessage('Dir_Ip must be a string')
        .isLength({ max: 15 }).withMessage('max length is 15')
        .custom((value, { req }) => {
            if (value) {
                const valueSplit = value.split('.')
                if (valueSplit.length != 4) {
                    throw new Error('Ip not valid');
                } else {
                    return true;
                }
            }
        }),
    check('Id_User')
        .optional().not().isEmpty().withMessage('Id_User cannot be empty')
        .isString().withMessage('Id_User must be a string')
        .isLength({ max: 100 }).withMessage('max length is 100'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]
