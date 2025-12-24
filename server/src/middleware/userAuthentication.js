import Joi from "joi";

export const registerUserAuth = (req, res, next) => {
    try {
        // const {name,email,password} = req.body;

        const checkUser = Joi.object({
            name: Joi.string().min(4).max(20).required(),
            email: Joi.string().required(),
            password: Joi.string().min(4).max(15).required()
        });

        const {error} = checkUser.validate(req.body);

        if(error){
            return res.status(400).json({
                message:"error found while authentication",
                success:false,
                Error:error
            })
        }
        next()
    } catch (error) {
        return res.status(400).json({
            message:"server error during authentication",
            success:false,
            Error:error
        })
    }
}

export const loginUserAuth = (req,res,next) => {
    try {
        const checkLoginUser = Joi.object({
            email:Joi.string().required(),
            password:Joi.string().min(4).max(15).required()
        })

        const {error} = checkLoginUser.validate(req.body);

        if(error){
            return res.json({
                Error:error
            })
        }
        next()
    } catch (error) {
        return res.status(400).json({
                Error:error
            })
    }
}