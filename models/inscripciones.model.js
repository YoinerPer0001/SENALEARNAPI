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

export const getAllInscxUserId = async (id)=>{
    return new Promise((resolve,reject)=>{
        connection.query("SELECT Id_Cur, Nom_Cur FROM inscripciones INNER JOIN cursos ON Id_Cur_FK = Id_Cur WHERE Id_User_FK =?",[id],(err,results)=>{
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

export const getAllInscxCurso = async (id)=>{
    return new Promise((resolve,reject)=>{
        connection.query("SELECT Id_User,Nom_User,Ape_User,Tel_User,Ema_User,Fot_User FROM inscripciones INNER JOIN usuarios ON Id_User_FK = Id_User WHERE Id_Cur_FK =?",[id],(err,results)=>{
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

export const getInscxUserxCurso = async (Id_User_FK, Id_Cur_FK)=>{
    return new Promise((resolve,reject)=>{
        connection.query("SELECT * FROM inscripciones WHERE Id_User_FK = ? AND Id_Cur_FK = ?",[Id_User_FK,Id_Cur_FK],(err,results)=>{
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

export const InsertInscriptions = async (datos)=>{
    return new Promise((resolve,reject)=>{
        connection.query("INSERT INTO inscripciones (Id_User_FK,Id_Cur_FK,Prog_Cur,fecha_insc) values (?,?,?,?)",[datos.Id_User_FK,datos.Id_Cur_FK,datos.Prog_Cur, datos.fecha_insc],(err,results)=>{
            if(err){
                console.log(err);
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

export const updateInscription = async (data, new_course)=>{
    let sentencia = "";
    if(new_course){
        sentencia = "UPDATE inscripciones SET Id_Cur_FK= ?, Prog_Cur =?, fecha_insc =? WHERE Id_User_FK =? AND Id_Cur_FK =?";
        return new Promise((resolve,reject)=>{
            connection.query(sentencia,[new_course,data.Prog_Cur, data.fecha_insc, data.Id_User_FK, data.Id_Cur_FK],(err,results)=>{
                if(err){
                    console.log(err);
                    const objError = {
                        errno: err.errno
                    }
                    reject(objError)
                }else{
                    resolve(results)
                }
            })
        })
    }else{

        sentencia = "UPDATE inscripciones SET Prog_Cur =?, fecha_insc =? WHERE Id_User_FK =? AND Id_Cur_FK =?";
        return new Promise((resolve,reject)=>{
            connection.query(sentencia,[data.Prog_Cur, data.fecha_insc, data.Id_User_FK, data.Id_Cur_FK],(err,results)=>{
                if(err){
                    console.log(err);
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
    
}

export const deleteInscription = async (data)=>{
    return new Promise((resolve,reject)=>{
        connection.query("DELETE FROM inscripciones WHERE Id_User_FK =? AND Id_Cur_FK =?",[data.Id_User_FK,data.Id_Cur_FK],(err,results)=>{
            if(err){
                console.log(err);
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