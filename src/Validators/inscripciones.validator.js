import { check } from "express-validator";
import { validateResult } from "../utils/validateResult.js";

export const createValidation = [
    check('Id_User')
        .exists().withMessage('Id_User is required')
        .not().isEmpty().withMessage('Id_User cannot be empty')
        .isString().withMessage('Id_User must be a string')
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
    check('Id_User')
        .optional().not().isEmpty().withMessage('Id_User cannot be empty')
        .isString().withMessage('Id_User must be a string')
        .isLength({ max: 100 }).withMessage('max length is 100'),
    check('Id_Cur')
        .optional().not().isEmpty().withMessage('Id_Cur cannot be empty')
        .isString().withMessage('Id_Cur must be a string')
        .isLength({ max: 100 }).withMessage('max length is 100'),
    check('Id_Cur_New')
        .optional().not().isEmpty().withMessage('Id_Cur_New cannot be empty')
        .isString().withMessage('Id_Cur_New must be a string')
        .isLength({ max: 100 }).withMessage('max length is 100'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]
