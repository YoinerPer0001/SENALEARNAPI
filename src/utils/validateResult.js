import { validationResult } from "express-validator";
import {response} from './responses.js'

export const validateResult = (req,res,next) => {
    try{
        validationResult(req).throw()
        return next()
    }catch(error){
        response(res,403,403,error)
    }
}