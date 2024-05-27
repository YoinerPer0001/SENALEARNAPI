import { check } from "express-validator";
import { validateResult } from "../utils/validateResult.js";

export const createxUserValidation = [
    check('Id_User')
        .exists().withMessage('Id_User is required')
        .not().isEmpty().withMessage('Id_User cannot be empty')
        .isString().withMessage('Id_User must be a string')
        .isLength({ max: 100 }).withMessage('max length is 255'),
    check('Id_Not')
        .exists().withMessage('Id_Not is required')
        .not().isEmpty().withMessage('Id_Not cannot be empty')
        .isString().withMessage('Id_Not must be a string'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

export const createxAllUsers = [
    check('Id_Not')
        .exists().withMessage('Id_Not is required')
        .not().isEmpty().withMessage('Id_Not cannot be empty')
        .isString().withMessage('Id_Not must be a string'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

export const createxCourseValidation = [
    check('Id_Not')
        .exists().withMessage('Id_Not is required')
        .not().isEmpty().withMessage('Id_Not cannot be empty')
        .isString().withMessage('Id_Not must be a string')
        .isLength({ max: 100 }).withMessage('max length is 255'),
    check('Id_Cur')
        .exists().withMessage('Id_Cur is required')
        .not().isEmpty().withMessage('Id_Cur cannot be empty')
        .isString().withMessage('Id_Cur must be a string'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

// export const UpdateValidation = [
//     check('Not_Tit')
//         .optional()
//         .not().isEmpty().withMessage('Not_Tit cannot be empty')
//         .isString().withMessage('Not_Tit must be a string')
//         .isLength({ max: 255 }).withMessage('max length is 255'),
//     check('Not_Mens')
//         .optional()
//         .not().isEmpty().withMessage('Not_Mens cannot be empty')
//         .isString().withMessage('Not_Mens must be a string'),
//     check('Not_Fec_Cre')
//         .optional().not().isEmpty().withMessage('Not_Fec_Cre cannot be empty')
//         .isString().withMessage('Not_Fec_Cre must be a string')
//         .custom((value, { req }) => {
//             if (value) {
//                 const valueSplit = value.split('-')
//                 if (valueSplit.length != 3) {
//                     throw new Error('Date not valid');
//                 } else {
//                     return true;
//                 }
//             }
//         }),
//     (req, res, next) => {
//         validateResult(req, res, next)
//     }
// ]
