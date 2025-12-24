import registerModel from '../models/user.model.js'
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await registerModel.findOne({
            
            email
        })

        if(user){
            return res.status(400).json({
                message:"oops! Email already exist",
                success:false
            })
        }

        const hashPassword = await bcrypt.hash(password,10);

        const newUser = new registerModel({
            name,
            email,
            password:hashPassword
        })

        const saveUser = await newUser.save();

        return res.status(201).json({
            message:"Registered!!",
            success:true,
            saveUser
        })
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message:"Error found while registering",
            success:false
        })
    }
}

export const login = async(req,res) => {
    try {
        const {email,password} = req.body

        const user = await registerModel.findOne({
            
            email
        })

        if(!user){
            return res.status(400).json({
                message:"user not exist",
                success:false
            })
        }

        const checkPassword = await bcrypt.compare(password,user.password);

        if(!checkPassword){
            return res.status(400).json({
                message:"Wrong Password",
                success:false
            })
        }

        const createToken = JWT.sign({id:user._id,name:user.name},process.env.SECRET_CODE,{'expiresIn':'1h'});

        return res.status(200).json({
            message:"Login!!",
            success:true,
            createToken
        })
    } catch (error) {
        return res.status(400).json({

            message:"Error found while login",
            success:false,
            Error:error
        })
    }
}


export const checkToken = (req,res) => {
    return res.status(200).json({
        message:"All good"
    })
}