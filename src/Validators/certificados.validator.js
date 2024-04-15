import { check } from "express-validator";
import { validateResult } from "../utils/validateResult.js";


export const createValidation = [
    check('Tit_Cert')
        .exists().withMessage('Tit_Cert is required')
        .not().isEmpty().withMessage('Tit_Cert cannot be empty')
        .isString().withMessage('Tit_Cert must be a string')
        .isLength({ max: 255 }).withMessage('Tit_Cert must be at most 255 characters long'),
    check('Descp_Cert')
        .exists().withMessage('Descp_Cert is required')
        .not().isEmpty().withMessage('Descp_Cert cannot be empty')
        .isString().withMessage('Descp_Cert must be a string'),
    check('Fec_Crea_Cert')
        .exists().withMessage('Fec_Crea_Cert is required')
        .not().isEmpty().withMessage('Fec_Crea_Cert cannot be empty')
        .isString().withMessage('Fec_Crea_Cert must be a string'),
    check('Firm_Dig_Cert')
        .exists().withMessage('Firm_Dig_Cert is required')
        .not().isEmpty().withMessage('Firm_Dig_Cert cannot be empty')
        .isString().withMessage('Firm_Dig_Cert must be a string')
        .isLength({ max: 255 }).withMessage('Firm_Dig_Cert must be at most 255 characters long'),
    check('Id_User')
        .exists().withMessage('Id_User is required')
        .not().isEmpty().withMessage('Id_User cannot be empty')
        .isString().withMessage('Id_User must be a string')
        .isLength({ max: 100 }).withMessage('Id_User must be at most 100 characters long'),
    check('Id_Cur')
        .exists().withMessage('Id_Cur is required')
        .not().isEmpty().withMessage('Id_Cur cannot be empty')
        .isString().withMessage('Id_Cur must be a string')
        .isLength({ max: 100 }).withMessage('Id_Cur must be at most 100 characters long'),

    (req, res, next) => {
        validateResult(req, res, next)
    }
]

export const UpdateValidation = [
    check('Tit_Cert')
        .optional().not().isEmpty().withMessage('Tit_Cert cannot be empty')
        .isString().withMessage('Tit_Cert must be a string')
        .isLength({ max: 255 }).withMessage('Tit_Cert must be at most 255 characters long'),
    check('Descp_Cert')
        .optional().not().isEmpty().withMessage('Descp_Cert cannot be empty')
        .isString().withMessage('Descp_Cert must be a string'),
    check('Fec_Crea_Cert')
        .optional().not().isEmpty().withMessage('Fec_Crea_Cert cannot be empty')
        .isString().withMessage('Fec_Crea_Cert must be a string'),
    check('Firm_Dig_Cert')
        .optional().not().isEmpty().withMessage('Firm_Dig_Cert cannot be empty')
        .isString().withMessage('Firm_Dig_Cert must be a string')
        .isLength({ max: 255 }).withMessage('Firm_Dig_Cert must be at most 255 characters long'),
    check('Id_User')
        .optional().not().isEmpty().withMessage('Id_User cannot be empty')
        .isString().withMessage('Id_User must be a string')
        .isLength({ max: 100 }).withMessage('Id_User must be at most 100 characters long'),
    check('Id_Cur')
        .optional().not().isEmpty().withMessage('Id_Cur cannot be empty')
        .isString().withMessage('Id_Cur must be a string')
        .isLength({ max: 100 }).withMessage('Id_Cur must be at most 100 characters long'),
    check('New_Curso')
        .optional().not().isEmpty().withMessage('New_Curso cannot be empty')
        .isString().withMessage('New_Curso must be a string')
        .isLength({ max: 100 }).withMessage('New_Curso must be at most 100 characters long'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]
