import registerModel from '../models/user.model.js'
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'
import doctorProfileModel from '../models/aboutDoctor.js';
import { nanoid } from 'nanoid';
import { sendMailForVerification } from '../../utills/email.js';
import otpModel from '../models/otpModel.js';

const generateNewOtp = () => {
    const otp = nanoid(6)
    // console.log(otp)
    return otp
}



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
                message: "oops! Email already exist. Please login",
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

        const getOtp = generateNewOtp();
        const resotp = await otpModel.create({
            otp: getOtp,
            email
        })
        try {
            await sendMailForVerification(email, getOtp)
        } catch (err) {
            return res.status(400).json({
                message: "otp not send error found",
                success: false
            })
        }



        const createUser = await registerModel.create(newUser);


        return res.status(201).json({
            message: "Otp send!!",
            success: true,
            createUser,
            resotp
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
        if (!email) {
            return res.status(400).json({
                message: "Email is required",
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

        if (!user.isVerified) {
            const newOtp = generateNewOtp();
            await otpModel.findOneAndDelete({ email: user.email })
            await otpModel.create({ email: user.email, otp: newOtp });
            await sendMailForVerification(email, newOtp)
            return res.status(200).json({
                message: "Please Verify your email",
                success: false,
                "requireOtp": true
            })
        }


        const createToken = JWT.sign({ id: user._id, name: user.name, role: user.role }, process.env.SECRET_CODE, { 'expiresIn': '1d' });
        // res.cookie('token',createToken,{
        //     httpOnly:true,
        //     secure:true,
        //     sameSite:"strict"
        // })
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

export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const otpExist = await otpModel.findOne({ email, otp })
        if (!otpExist) {
            return res.status(400).json({
                message: "invalid otp",
                success: false
            })
        }

        const updateVerify = await registerModel.findOneAndUpdate({ email }, { isVerified: true }, { new: true })

        await otpModel.findOneAndDelete(otpExist._id);

        return res.status(200).json({
            message: "verified!!",
            success: true
        })
    } catch (err) {
        console.error(err)
        return res.status(500).json({
            message: "internal server error while verifying otp",
            success: false
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


export const upsertDoctorProfile = async (req, res) => {
    try {
        const { id } = req.params;

        if (req.role !== "DOCTOR") {
            return res.status(403).json({
                message: "Only doctors can add/update doctor Profile",
                success: false
            });
        }

        const { specialization, experience, licenseNumber } = req.body;
        if (!specialization || !experience || !licenseNumber) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            })
        }

        let doctorProfile = await doctorProfileModel.findOne({ doctor: id})
        if (doctorProfile) {
            doctorProfile = await doctorProfileModel.findOneAndUpdate(
                { doctor: userId },
                { specialization, experience, licenseNumber },
                { returnDocument: "after" }
            )
        } else {
            doctorProfile = await doctorProfileModel.create({
                doctor: id, specialization, experience, licenseNumber, verifiedDoctor: true
            })
        }

        return res.status(201).json({
            message: "new Doctor Profile",
            success: true,
            doctorProfile
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

export const getDoctorForPatient = async (req, res) => {
    try {
        if (req.role !== "PATIENT") {
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
            message: "All doctors",
            success: true,
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