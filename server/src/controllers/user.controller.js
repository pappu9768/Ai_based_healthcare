import registerModel from '../models/user.model.js'
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'
import { doctorProfileModel } from '../models/docter.model.js';


export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // if (!name || !email || !password || !role) {
        //     return res.status(400).json({
        //         message: "All fields are required",
        //         success: false
        //     })
        // }

        const user = await registerModel.findOne({
            email
        })

        if (user) {
            return res.status(400).json({
                message: "oops! Email already exist",
                success: false
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await registerModel.create({
            name,
            email,
            password: hashPassword,
            role
        })

        //create doctor profile if role is selected as DOCTOR
        if (role === 'DOCTOR') {

            // if (!specialty || !experience) {
            //     return res.status(404).json({
            //         message: "For doctors, specialty & experience is required",
            //         success: false
            //     })
            // }

            await doctorProfileModel.create({
                user: newUser._id,
                specialty,
                consultationFee,
                experience
            })
        }



        return res.status(201).json({
            message: "Registered!!",
            success: true,
            newUser
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Error found while registering",
            success: false
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await registerModel.findOne({

            email
        })

        if (!user) {
            return res.status(400).json({
                message: "user not exist",
                success: false
            })
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return res.status(400).json({
                message: "Invalid Password",
                success: false
            })
        }

        const createToken = JWT.sign({ id: user._id, name: user.name, role: user.role }, process.env.SECRET_CODE, { 'expiresIn': '1h' });

        return res.status(200).json({
            message: "Login!!",
            success: true,
            createToken
        })
    } catch (error) {
        return res.status(400).json({

            message: "Error found while login",
            success: false,
            Error: error
        })
    }
}


export const checkToken = (req, res) => {
    const userrole = req.role
    return res.status(200).json({
        message: "All good",
        role: userrole,

    })
}