import { check } from "express-validator";
import { validateResult } from "../utils/validateResult.js";

export const createValidation = [
    check('Not_Tit')
        .exists().withMessage('Not_Tit is required')
        .not().isEmpty().withMessage('Not_Tit cannot be empty')
        .isString().withMessage('Not_Tit must be a string')
        .isLength({ max: 255 }).withMessage('max length is 255'),
    check('Not_Mens')
        .exists().withMessage('Not_Mens is required')
        .not().isEmpty().withMessage('Not_Mens cannot be empty')
        .isString().withMessage('Not_Mens must be a string'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

export const UpdateValidation = [
    check('Not_Tit')
        .optional()
        .not().isEmpty().withMessage('Not_Tit cannot be empty')
        .isString().withMessage('Not_Tit must be a string')
        .isLength({ max: 255 }).withMessage('max length is 255'),
    check('Not_Mens')
        .optional()
        .not().isEmpty().withMessage('Not_Mens cannot be empty')
        .isString().withMessage('Not_Mens must be a string'),
    check('Not_Fec_Cre')
        .optional().not().isEmpty().withMessage('Not_Fec_Cre cannot be empty')
        .isString().withMessage('Not_Fec_Cre must be a string')
        .custom((value, { req }) => {
            if (value) {
                const valueSplit = value.split('-')
                if (valueSplit.length != 3) {
                    throw new Error('Date not valid');
                } else {
                    return true;
                }
            }
        }),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]
