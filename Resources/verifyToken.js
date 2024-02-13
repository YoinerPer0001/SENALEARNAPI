import jsonwebtoken from 'jsonwebtoken';
const jwt = jsonwebtoken;

export const verifyToken = async (req, res, next) => {
    try {
        let bearerHeader = req.headers['authorization'];
        let token = req.params.token;
        
        if (token) {

            const bearerToken = token;

            const decodetoken = jwt.decode(bearerToken, { complete: true })

            const fechaActual = Math.floor(Date.now() / 1000);

            if (fechaActual > decodetoken.payload.exp) {
                return res.status(400).json({
                    message: "Expired token"
                })
            }

            req.token = bearerToken;
            next();

        } else if (typeof bearerHeader !== "undefined") {

            
            const bearerToken = bearerHeader.split(' ')[1];


            const decodetoken = jwt.decode(bearerToken, { complete: true })

            const fechaActual = Math.floor(Date.now() / 1000);

            if (fechaActual > decodetoken.payload.exp) {
                return res.status(400).json({
                    message: "Expired token"
                })
            }

            req.token = bearerToken;
            next();

        } else {
            res.status(400).json({
                result: 101,
                error: "invalid token"
            });
        }
    } catch (error) {
        res.status(400).json({
            result: 101,
            error: "invalid token",
            errorMessage: error
        })
    }
}