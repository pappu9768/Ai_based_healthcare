import registerModel from '../models/user.model.js'
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'
import doctorInfoModel from '../models/aboutDoctor.js';



export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "name is required",
                success: false
            })
        }

        if (!email || !email.includes("@")) {
            return res.status(400).json({
                message: "Only valid email is accepted",
                success: false
            })
        }


        if (!password) {
            return res.status(400).json({
                message: "password is required",
                success: false
            })
        }
        if (password.length < 6) {
            return res.status(400).json({
                message: "password length should be always greater then 6",
                success: false
            })
        }
        if (!role) {
            return res.status(400).json({
                message: "role is required",
                success: false
            })
        }

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

        // create user object 
        const newUser = {
            name,
            email,
            password: hashPassword,
            role
        }

        
        const createUser = await registerModel.create(newUser)




        return res.status(201).json({
            message: "Registration successfull",
            success: true,
            createUser
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
        const { email, password } = req.body;

        if (!password) {
            return res.status(400).json({
                message: "password is required",
                success: false
            })
        }
        if (password.length < 6) {
            return res.status(400).json({
                message: "password length should be always greater then 6",
                success: false
            })
        }

        const user = await registerModel.findOne({
            email
        })

        if (!user) {
            return res.status(400).json({
                message: "user with this email is not exist",
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

        const createToken = JWT.sign({ id: user._id, name: user.name, role: user.role }, process.env.SECRET_CODE, { 'expiresIn': '1d' });

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


export const upsertDoctorInfo = async (req, res) => {
    try {
        const userId = req.id;

        if (req.role !== "DOCTOR") {
            return res.status(403).json({
                message: "Only doctors can add/update doctor info",
                success: false
            });
        }

        const { specialization, experience, licenseNumber } = req.body;
        if(!specialization || !experience || !licenseNumber){
            return res.status(400).json({
                message:"All fields are required",
                success:false
            })
        }

        let doctorInfo = await doctorInfoModel.findOne({ doctor: userId })
        if (doctorInfo) {
            doctorInfo = await doctorInfoModel.findOneAndUpdate(
                { doctor: userId },
                { specialization, experience, licenseNumber },
                { returnDocument: "after" }
            )
        }else{
            doctorInfo = await doctorInfoModel.create({
                doctor:userId,specialization, experience, licenseNumber
            })
        }

        return res.status(201).json({
            message:"new Doctor Info",
            success: true,
            doctorInfo
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: "Error found while login",
            success: false,
            Error: error
        })
    }
}

export const getDoctorForPatient = async(req,res) => {
    try {
        if(req.role !== "PATIENT"){
            return res.status(403).json({
                message: "Only can access doctor info only to book ",
                success: false
            });
        }

        const getDoctor = await doctorInfoModel.find().select("-licenseNumber") 
            .populate({
                path: "doctor",
                select: "name" 
            });

        return res.status(200).json({
            message:"All doctors",
            success:true,
            getDoctor
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: "Error found while login",
            success: false,
            Error: error
        })
    
    }
}