import { check } from "express-validator";
import { validateResult } from "../utils/validateResult.js";

export const createValidation = [
    check('Nom_Cat')
        .exists().withMessage('Nom_Cat is required')
        .not().isEmpty().withMessage('Nom_Cat cannot be empty')
        .isString().withMessage('Nom_Cat must be a string')
        .isLength({ max: 100 }).withMessage('max length is 100'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

export const UpdateValidation = [
    check('Nom_Cat')
        .optional().not().isEmpty().withMessage('Nom_Cat cannot be empty')
        .isString().withMessage('Nom_Cat must be a string')
        .isLength({ max: 100 }).withMessage('max length is 100'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]
