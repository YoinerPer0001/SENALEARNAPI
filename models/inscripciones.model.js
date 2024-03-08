import {connection} from '../db.js'

export const getAllIns = async ()=>{
    return new Promise((resolve,reject)=>{
        connection.query("SELECT * FROM inscripciones",(err,results)=>{
            if(err){
                const objError = {
                    errno: err.errno
                }
                reject(objError)
            }else{
                resolve(results)
            }
        })
    })
}