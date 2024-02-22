export const response = (res,status, Cod_Result, data)=>{
    return res.status(status).json({
        Cod_Result: Cod_Result,
        data: data
    });
}