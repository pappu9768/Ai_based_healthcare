import Joi from "joi";

export const registerUserAuth = (req, res, next) => {
    try {
        // const {name,email,password} = req.body;

        const checkUser = Joi.object({
            name: Joi.string().min(4).max(20).required(),
            email: Joi.string().required(),
            password: Joi.string().min(4).max(15).required(),
            // confirmPassword: Joi.string()
            //     .valid(Joi.ref('password'))
                
            //     .messages({
            //         'any.only': 'Passwords do not match'
            //     }),
            role: Joi.string().valid('DOCTOR','PATIENT').required(),

            specialty: Joi.when("role",{
                is:'DOCTOR',
                then: Joi.string().required(),
                otherwise: Joi.optional()
            }),
            experience: Joi.when("role",{
                is:'DOCTOR',
                then: Joi.string().required(),
                otherwise: Joi.optional()
            }), 
            consultationFee: Joi.when("role",{
                is:'DOCTOR',
                then: Joi.string(),
                otherwise: Joi.optional()
            }),

        });

        const { error, value } = checkUser.validate(req.body);

        if (error) {

            return res.status(400).json({
                message: "Error found while authentication",
                success: false,
                Error: error
            })
        }

        delete value.confirmPassword;
        req.body = value
        next()
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "server error during authentication",
            success: false,
            Error: error
        })
    }
}

export const loginUserAuth = (req, res, next) => {
    try {
        const checkLoginUser = Joi.object({
            email: Joi.string().required(),
            password: Joi.string().min(4).max(15).required()
        })

        const { error } = checkLoginUser.validate(req.body);

        if (error) {
            return res.json({
                Error: error
            })
        }
        next()
    } catch (error) {
        return res.status(400).json({
            Error: error
        })
    }
}