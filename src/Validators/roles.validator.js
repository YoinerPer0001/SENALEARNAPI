import { check } from "express-validator";
import { validateResult } from "../utils/validateResult.js";

export const createValidation = [
    check('Nom_Rol')
        .exists().withMessage('Nom_Rol is required')
        .not().isEmpty().withMessage('Nom_Rol cannot be empty')
        .isString().withMessage('Nom_Rol must be a string')
        .isLength({ max: 100 }).withMessage('max length is 100'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

export const UpdateValidation = [
    check('Nom_Rol')
        .optional().not().isEmpty().withMessage('Nom_Rol cannot be empty')
        .isString().withMessage('Nom_Rol must be a string')
        .isLength({ max: 100 }).withMessage('max length is 100'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]
