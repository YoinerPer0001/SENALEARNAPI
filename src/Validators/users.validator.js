import { check } from "express-validator";
import { validateResult } from "../utils/validateResult.js";

export const createValidation = [
    check('Nom_User')
        .exists().withMessage('Nom_User is required')
        .not().isEmpty().withMessage('Nom_User cannot be empty')
        .isString().withMessage('Nom_User must be a string')
        .isLength({ max: 100 }).withMessage('Nom_User must be at most 100 characters long'),
    check('Ape_User')
        .exists().withMessage('Ape_User is required')
        .not().isEmpty().withMessage('Ape_User cannot be empty')
        .isString().withMessage('Ape_User must be a string')
        .isLength({ max: 100 }).withMessage('Ape_User must be at most 100 characters long'),
    check('Ema_User')
        .exists().withMessage('Ema_User is required')
        .not().isEmpty().withMessage('Ema_User cannot be empty')
        .isEmail().withMessage('Ema_User must be a valid email address')
        .isLength({ max: 100 }).withMessage('Ema_User must be at most 100 characters long'),
    check('Pass_User')
        .exists().withMessage('Pass_User is required')
        .not().isEmpty().withMessage('Pass_User cannot be empty')
        .isString().withMessage('Pass_User must be a string')
        .isLength({ min: 8, max: 100 }).withMessage('Pass_User must be at most 8 characters long'),
    check('Dir_Ip')
        .exists().withMessage('Dir_Ip is required')
        .not().isEmpty().withMessage('Dir_Ip cannot be empty')
        .isString().withMessage('Dir_Ip must be a string')
        .isLength({ max: 15 }).withMessage('Dir_Ip must be at most 15 characters long')
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
    (res, req, next) => {
        validateResult(res, req, next)
    }
]
export const LoginValidation = [
    check('Ema_User')
        .exists().withMessage('Ema_User is required')
        .not().isEmpty().withMessage('Ema_User cannot be empty')
        .isEmail().withMessage('Ema_User must be a valid email address')
        .isLength({ max: 100 }).withMessage('Ema_User must be at most 100 characters long'),
    check('Pass_User')
        .exists().withMessage('Pass_User is required')
        .not().isEmpty().withMessage('Pass_User cannot be empty')
        .isString().withMessage('Pass_User must be a string')
        .isLength({ max: 100 }).withMessage('Pass_User must be at most 100 characters long'),
    check('Dir_Ip')
        .exists().withMessage('Dir_Ip is required')
        .not().isEmpty().withMessage('Dir_Ip cannot be empty')
        .isString().withMessage('Dir_Ip must be a string')
        .isLength({ max: 15 }).withMessage('Dir_Ip must be at most 15 characters long')
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
    (res, req, next) => {
        validateResult(res, req, next)
    }
]

export const CodeValidationEmail = [
    check('Id_User')
        .exists().withMessage('Id_User is required')
        .not().isEmpty().withMessage('Id_User cannot be empty')
        .isString().withMessage('Id_User must be a string')
        .isLength({ max: 100 }).withMessage('Id_User must be at most 100 characters long'),
    check('codigo')
        .exists().withMessage('Codigo is required')
        .not().isEmpty().withMessage('Codigo cannot be empty')
        .isString().withMessage('Codigo must be a string')
        .isLength({ min: 6, max: 6 }).withMessage('max length must be at least 6 characters'),
    (res, req, next) => {
        validateResult(res, req, next)
    }
]

export const CodeValidationIp = [
    check('Id_User')
        .exists().withMessage('Id_User is required')
        .not().isEmpty().withMessage('Id_User cannot be empty')
        .isString().withMessage('Id_User must be a string')
        .isLength({ max: 100 }).withMessage('Id_User must be at most 100 characters long'),
    check('codigo')
        .exists().withMessage('Codigo is required')
        .not().isEmpty().withMessage('Codigo cannot be empty')
        .isString().withMessage('Codigo must be a string')
        .isLength({ min: 6, max: 6 }).withMessage('max length must be at least 6 characters'),
    check('Dir_Ip')
        .optional().not().isEmpty().withMessage('Dir_Ip cannot be empty')
        .isString().withMessage('Dir_Ip must be a string')
        .isLength({ max: 15 }).withMessage('Dir_Ip must be at most 15 characters long')
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
    (res, req, next) => {
        validateResult(res, req, next)
    }
]

export const UpdateValidation = [
    check('Nom_User')
        .optional().not().isEmpty().withMessage('Nom_User cannot be empty')
        .isString().withMessage('Nom_User must be a string')
        .isLength({ max: 100 }).withMessage('Nom_User must be at most 100 characters long'),
    check('Ape_User')
        .optional().not().isEmpty().withMessage('Ape_User cannot be empty')
        .isString().withMessage('Ape_User must be a string')
        .isLength({ max: 100 }).withMessage('Ape_User must be at most 100 characters long'),
    check('Tel_User')
        .optional().not().isEmpty().withMessage('Tel_User cannot be empty')
        .isString().withMessage('Tel_User must be a string')
        .isLength({ min: 10, max: 10 }).withMessage('Tel_User must be at most 10 characters long'),
    check('Ema_User')
        .optional().not().isEmpty().withMessage('Ema_User cannot be empty')
        .isEmail().withMessage('Ema_User must be a valid email address')
        .isLength({ max: 100 }).withMessage('Ema_User must be at most 100 characters long'),
    check('Pass_User')
        .optional().not().isEmpty().withMessage('Pass_User cannot be empty')
        .isString().withMessage('Pass_User must be a string')
        .isLength({ max: 100 }).withMessage('Pass_User must be at most 100 characters long'),
    check('Dir_Ip')
        .optional().not().isEmpty().withMessage('Dir_Ip cannot be empty')
        .isString().withMessage('Dir_Ip must be a string')
        .isLength({ max: 15 }).withMessage('Dir_Ip must be at most 15 characters long')
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
    (res, req, next) => {
        validateResult(res, req, next)
    }
]


export const PassRestart = [
    check('Ema_User')
        .exists().withMessage('Ema_User is required')
        .not().isEmpty().withMessage('Ema_User cannot be empty')
        .isEmail().withMessage('Ema_User must be a valid email address')
        .isLength({ max: 100 }).withMessage('Ema_User must be at most 100 characters long'),
    check('codigo')
        .exists().withMessage('Codigo is required')
        .not().isEmpty().withMessage('Codigo cannot be empty')
        .isString().withMessage('Codigo must be a string')
        .isLength({ min: 6, max: 6 }).withMessage('max length must be at least 6 characters'),
    (res, req, next) => {
        validateResult(res, req, next)
    }
]

export const PassChangeValidation = [
    check('Ema_User')
        .exists().withMessage('Ema_User is required')
        .not().isEmpty().withMessage('Ema_User cannot be empty')
        .isEmail().withMessage('Ema_User must be a valid email address')
        .isLength({ max: 100 }).withMessage('Ema_User must be at most 100 characters long'),
    check('newPass')
        .exists().withMessage('newPass is required')
        .not().isEmpty().withMessage('newPass cannot be empty')
        .isString().withMessage('newPass must be a string')
        .isLength({ min: 8, max: 100 }).withMessage('newPass must be at most 8 characters long'),
    (res, req, next) => {
        validateResult(res, req, next)
    }
]