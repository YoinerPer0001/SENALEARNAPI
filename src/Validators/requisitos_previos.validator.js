import { check } from "express-validator";
import { validateResult } from "../utils/validateResult.js";

export const createValidation = [
    check('Id_Cur')
        .exists().withMessage('Id_Cur is required')
        .not().isEmpty().withMessage('Id_Cur cannot be empty')
        .isString().withMessage('Id_Cur must be a string')
        .isLength({ max: 100 }).withMessage('Id_Cur must be max length is 100'),
    check('Desc_Req')
        .exists().withMessage('Desc_Req is required')
        .not().isEmpty().withMessage('Desc_Req cannot be empty')
        .isString().withMessage('Desc_Req must be a string'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

export const UpdateValidation = [
    check('Id_Cur')
        .optional().not().isEmpty().withMessage('Id_Cur cannot be empty')
        .isString().withMessage('Id_Cur must be a string')
        .isLength({ max: 100 }).withMessage('Id_Cur must be max length is 100'),
    check('Desc_Req')
        .optional().not().isEmpty().withMessage('Desc_Req cannot be empty')
        .isString().withMessage('Desc_Req must be a string'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]
