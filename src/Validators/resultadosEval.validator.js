import { check } from "express-validator";
import { validateResult } from "../utils/validateResult.js";


export const createValidation = [
    check('Id_Eval')
        .exists().withMessage('Id_Eval_FK is required')
        .not().isEmpty().withMessage('Id_Eval_FK cannot be empty')
        .isString().withMessage('Id_Eval_FK must be a string')
        .isLength({ max: 100 }).withMessage('Id_Eval_FK must be at most 100 characters long'),
    check('Id_User')
        .exists().withMessage('Id_User is required')
        .not().isEmpty().withMessage('Id_User cannot be empty')
        .isString().withMessage('Id_User must be a string')
        .isLength({ max: 100 }).withMessage('Id_User must be at most 100 characters long'),
    check('OBJ')
        .exists().withMessage('OBJ is required (OBJ is array of questions and answers)')
        .not().isEmpty().withMessage('OBJ cannot be empty (OBJ is array of questions and answers)'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

export const UpdateValidation = [
    check('Id_Eval_New')
        .optional().not().isEmpty().withMessage('Id_Eval_New cannot be empty')
        .isString().withMessage('Id_Eval_New must be a string')
        .isLength({ max: 100 }).withMessage('Id_Eval_New must be at most 100 characters long'),
    check('Puntuacion')
        .optional().not().isEmpty().withMessage('Puntuacion cannot be empty')
        .isNumeric().withMessage('Puntuacion must be a number')
        .isLength({ max: 5 }).withMessage('Puntuacion must be at most 5 characters long'),
    check('Fech_Real_Eval')
        .optional().not().isEmpty().withMessage('Fech_Real_Eval cannot be empty')
        .isString().withMessage('Fech_Real_Eval must be a string')
        .isLength({ max: 10 }).withMessage('Fech_Real_Eval must be at most 10 characters long'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

export const GetResultValidation = [
    check('Id_Eval')
        .exists().withMessage('Id_Eval_FK is required')
        .not().isEmpty().withMessage('Id_Eval_FK cannot be empty')
        .isString().withMessage('Id_Eval_FK must be a string')
        .isLength({ max: 100 }).withMessage('Id_Eval_FK must be at most 100 characters long'),
    check('Id_User')
        .exists().withMessage('Id_User is required')
        .not().isEmpty().withMessage('Id_User cannot be empty')
        .isString().withMessage('Id_User must be a string')
        .isLength({ max: 100 }).withMessage('Id_User must be at most 100 characters long'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]
