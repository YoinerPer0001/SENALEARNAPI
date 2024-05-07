import { check } from "express-validator";
import { validateResult } from "../utils/validateResult.js";

export const createValidation = [
    check('Nom_Cur')
        .exists().withMessage('Nom_Cur is required')
        .not().isEmpty().withMessage('Nom_Cur cannot be empty')
        .isString().withMessage('Nom_Cur must be a string')
        .isLength({ max: 100 }).withMessage('max length is 100'),
    check('Des_Cur')
        .exists().withMessage('Des_Cur is required')
        .not().isEmpty().withMessage('Des_Cur cannot be empty')
        .isString().withMessage('Des_Cur must be a string')
        .isLength({ max: 100 }).withMessage('max length is 100'),
    check('Id_Cat_FK')
        .exists().withMessage('Id_Cat_FK is required')
        .not().isEmpty().withMessage('Id_Cat_FK cannot be empty')
        .isString().withMessage('Id_Cat_FK must be a string')
        .isLength({ max: 100 }).withMessage('max length is 100'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

export const UpdateValidation = [
    check('Nom_Cur')
        .optional().not().isEmpty().withMessage('Nom_Cur cannot be empty')
        .isString().withMessage('Nom_Cur must be a string')
        .isLength({ max: 100 }).withMessage('max length is 100'),
    check('Des_Cur')
        .optional().not().isEmpty().withMessage('Des_Cur cannot be empty')
        .isString().withMessage('Des_Cur must be a string')
        .isLength({ max: 100 }).withMessage('max length is 100'),
    check('Hor_Cont_Total')
        .optional().not().isEmpty().withMessage('Hor_Cont_Total cannot be empty')
        .isNumeric().withMessage('Hor_Cont_Total must be a number')
        .isLength({ max: 100 }).withMessage('max length is 100'),
    check('Fech_Crea_Cur')
        .optional().not().isEmpty().withMessage('Fech_Crea_Cur cannot be empty')
        .isString().withMessage('Fech_Crea_Cur must be a string')
        .isLength({ max: 100 }).withMessage('max length is 100'),
    check('Id_Cat_FK')
        .optional().not().isEmpty().withMessage('Id_Cat_FK cannot be empty')
        .isString().withMessage('Id_Cat_FK must be a string')
        .isLength({ max: 100 }).withMessage('max length is 100'),
    check('Fot_Cur')
        .optional().not().isEmpty().withMessage('Fot_Cur cannot be empty')
        .isString().withMessage('Fot_Cur must be a string')
        .isLength({ max: 200 }).withMessage('max length is 200'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]
