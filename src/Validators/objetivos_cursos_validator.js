import { check } from "express-validator";
import { validateResult } from "../utils/validateResult.js";

export const createValidation = [
    check('Desc_Objetivo')
        .exists().withMessage('Desc_Objetivo is required')
        .not().isEmpty().withMessage('Desc_Objetivo cannot be empty')
        .isString().withMessage('Desc_Objetivo must be a string')
        .isLength({ max: 255 }).withMessage('max length is 255'),
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
    check('Desc_Objetivo')
        .exists().withMessage('Desc_Objetivo is required')
        .not().isEmpty().withMessage('Desc_Objetivo cannot be empty')
        .isString().withMessage('Desc_Objetivo must be a string')
        .isLength({ max: 255 }).withMessage('max length is 255'),
    check('Id_Cur')
        .exists().withMessage('Id_Cur is required')
        .not().isEmpty().withMessage('Id_Cur cannot be empty')
        .isString().withMessage('Id_Cur must be a string')
        .isLength({ max: 100 }).withMessage('max length is 100'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]
