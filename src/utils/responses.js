export const response = (res, status, codigo, message, exData) => {
    if (status != 200) {
        return res.status(status).json({

            type: "error",
            code: codigo,
            message: message


        });
    } else {

        return res.status(status).json({

            type: "success",
            data: message,
            exData : exData


        });

    }

}