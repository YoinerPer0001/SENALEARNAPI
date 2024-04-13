import { check } from "express-validator";
import { validateResult } from "../utils/validateResult.js";

export const createValidation = [
    check('Tip_Cont')
        .exists().withMessage('Tip_Cont is required')
        .not().isEmpty().withMessage('Tip_Cont cannot be empty')
        .isNumeric().withMessage('Tip_Cont must be a number')
        .isLength({ max: 50 }).withMessage('max length is 50'),
    check('Url_Cont')
        .exists().withMessage('Url_Cont is required')
        .not().isEmpty().withMessage('Url_Cont cannot be empty')
        .isString().withMessage('Url_Cont must be a string')
        .isLength({ max: 100 }).withMessage('max length is 100'),
    check('Tit_Cont')
        .exists().withMessage('Tit_Cont is required')
        .not().isEmpty().withMessage('Tit_Cont cannot be empty')
        .isString().withMessage('Tit_Cont must be text')
        .isLength({ max: 100 }).withMessage('max length is 100'),
    check('Id_Mod_FK')
        .exists().withMessage('Id_Mod_FK is required')
        .not().isEmpty().withMessage('Id_Mod_FK cannot be empty')
        .isString().withMessage('Id_Mod_FK must be a string')
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
        .isString().withMessage('Url_Cont must be a string')
        .isLength({ max: 100 }).withMessage('max length is 100'),
    check('Tit_Cont')
        .optional().not().isEmpty().withMessage('Tit_Cont cannot be empty')
        .isNumeric().withMessage('Tit_Cont must be a number')
        .isLength({ max: 100 }).withMessage('max length is 100'),
    check('Id_Mod_FK')
        .optional().not().isEmpty().withMessage('Id_Mod_FK cannot be empty')
        .isString().withMessage('Id_Mod_FK must be a string')
        .isLength({ max: 100 }).withMessage('max length is 100'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]
