import { check } from "express-validator";
import { validateResult } from "../utils/validateResult.js";

export const createValidation = [
    check('Id_Rol')
        .exists().withMessage('Id_Rol is required')
        .not().isEmpty().withMessage('Id_Rol cannot be empty')
        .isNumeric().withMessage('Id_Rol must be a number')
        .isLength({ max: 100 }).withMessage('max length is 100'),
    check('Id_Opcion')
        .exists().withMessage('Id_Opcion is required')
        .not().isEmpty().withMessage('Id_Opcion cannot be empty')
        .isNumeric().withMessage('Id_Opcion must be a number')
        .isLength({ max: 100 }).withMessage('max length is 100'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

export const UpdateValidation = [
    check('Id_Rol')
        .optional().not().isEmpty().withMessage('Id_Rol cannot be empty')
        .isNumeric().withMessage('Id_Rol must be a number')
        .isLength({ max: 100 }).withMessage('max length is 100'),
    check('Id_Opcion')
        .optional().not().isEmpty().withMessage('Id_Opcion cannot be empty')
        .isNumeric().withMessage('Id_Opcion must be a number')
        .isLength({ max: 100 }).withMessage('max length is 100'),
    check('New_Opcion')
        .optional().not().isEmpty().withMessage('New_Opcion cannot be empty')
        .isNumeric().withMessage('New_Opcion must be a number')
        .isLength({ max: 100 }).withMessage('max length is 100'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]
