import { check } from "express-validator";
import { validateResult } from "../utils/validateResult.js";

export const createValidation = [
    check('Tit_Cont')
        .exists().withMessage('Tit_Cont is required')
        .not().isEmpty().withMessage('Tit_Cont cannot be empty')
        .isString().withMessage('Tit_Cont must be text'),
    check('Id_Mod_FK')
        .exists().withMessage('Id_Mod_FK is required')
        .not().isEmpty().withMessage('Id_Mod_FK cannot be empty')
        .isString().withMessage('Id_Mod_FK must be a string')
        .isLength({ max: 100 }).withMessage('max length is 100'),
    check('Indice')
        .exists().withMessage('Indice is required')
        .not().isEmpty().withMessage('Indice cannot be empty')
        .isNumeric().withMessage('Indice must be a numeric value')
        .isLength({ max: 100 }).withMessage('max length is 100'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

export const UpdateValidation = [
    check('Tip_Cont')
        .optional().not().isEmpty().withMessage('Tip_Cont cannot be empty')
        .isNumeric().withMessage('Tip_Cont must be a number')
        .isLength({ max: 50 }).withMessage('max length is 50'),
    check('Url_Cont')
        .optional().not().isEmpty().withMessage('Url_Cont cannot be empty')
        .isString().withMessage('Url_Cont must be a string'),
    check('Tit_Cont')
        .optional().not().isEmpty().withMessage('Tit_Cont cannot be empty')
        .isNumeric().withMessage('Tit_Cont must be a number')
        .isLength({ max: 100 }).withMessage('max length is 100'),
    check('Id_Mod_FK')
        .optional().not().isEmpty().withMessage('Id_Mod_FK cannot be empty')
        .isString().withMessage('Id_Mod_FK must be a string')
        .isLength({ max: 100 }).withMessage('max length is 100'),
    check('Indice')
        .optional().not()
        .not().isEmpty().withMessage('Indice cannot be empty')
        .isNumeric().withMessage('Indice must be a numeric value')
        .isLength({ max: 100 }).withMessage('max length is 100'),
    check('Duracion')
        .optional().not()
        .not().isEmpty().withMessage('Duracion cannot be empty')
        .isDecimal().withMessage('Duracion must be a decimal value')
        .isLength({ max: 100 }).withMessage('max length is 100'),

    (req, res, next) => {
        validateResult(req, res, next)
    }
]
