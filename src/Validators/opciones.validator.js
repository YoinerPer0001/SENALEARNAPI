import { check } from "express-validator";
import { validateResult } from "../utils/validateResult.js";

export const createValidation = [
    check('nombre_opcion')
        .exists().withMessage('nombre_opcion is required')
        .not().isEmpty().withMessage('nombre_opcion cannot be empty')
        .isString().withMessage('nombre_opcion must be a string')
        .isLength({ max: 100 }).withMessage('max length is 100'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

export const UpdateValidation = [
    check('nombre_opcion')
        .optional().not().isEmpty().withMessage('nombre_opcion cannot be empty')
        .isString().withMessage('nombre_opcion must be a string')
        .isLength({ max: 100 }).withMessage('max length is 100'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]
