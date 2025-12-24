import JWT from 'jsonwebtoken'

export const tokenCheck = async(req,res,next) => {
    try {
        const getToken = req.headers['authorization'];

        if(!getToken){
            return res.status(404).json({
                message:"Token not found",
                success:false
            })
        }

        const verifyToken = JWT.verify(getToken,process.env.SECRET_CODE);
        console.log(verifyToken);


        next()
    } catch (error) {
        return res.status(400).json({
            message:"Internal server error",
            success:false
        })
    }
}