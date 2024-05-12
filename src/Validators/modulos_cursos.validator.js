import { check } from "express-validator";
import { validateResult } from "../utils/validateResult.js";

export const createValidation = [
    check('Tit_Mod')
        .exists().withMessage('Tit_Mod is required')
        .not().isEmpty().withMessage('Tit_Mod cannot be empty')
        .isString().withMessage('Tit_Mod must be a string')
        .isLength({ max: 100 }).withMessage('max length is 100'),
    check('Id_Cur')
        .exists().withMessage('Id_Cur is required')
        .not().isEmpty().withMessage('Id_Cur cannot be empty')
        .isString().withMessage('Id_Cur must be a string')
        .isLength({ max: 100 }).withMessage('max length is 100'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

export const UpdateValidation = [
    check('Tit_Mod')
        .optional().not().isEmpty().withMessage('Tit_Mod cannot be empty')
        .isString().withMessage('Tit_Mod must be a string')
        .isLength({ max: 100 }).withMessage('max length is 100'),
    check('Id_Cur')
        .optional().not().isEmpty().withMessage('Id_Cur cannot be empty')
        .isString().withMessage('Id_Cur must be a string')
        .isLength({ max: 100 }).withMessage('max length is 100'),
    check('Horas_Cont_Mod')
        .optional().not().isEmpty().withMessage('Horas_Cont_Mod cannot be empty')
        .isNumeric().withMessage('Horas_Cont_Mod must be a number')
        .isLength({ max: 100 }).withMessage('max length is 100'),
    check('Est_Mod')
        .optional().not().isEmpty().withMessage('Est_Mod cannot be empty')
        .isString().withMessage('Est_Mod must be a string')
        .isLength({ max: 100 }).withMessage('max length is 100'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]
