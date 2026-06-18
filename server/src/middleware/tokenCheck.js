import JWT from 'jsonwebtoken'

export const tokenCheck = async (req, res, next) => {
    try {
        const getToken = req.headers['authorization'];
        // const getToken = req.cookies.token;

        if (!getToken) {
            return res.status(401).json({
                message: "Token not found",
                success: false
            })
        }

        const verifyToken = JWT.verify(getToken, process.env.SECRET_CODE);
        // console.log(verifyToken);
        // console.log(verifyToken.role)
        req.id = verifyToken.id
        req.name = verifyToken.name
        req.role = verifyToken.role
        // console.log(req.id);


        next()
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}