import { populate } from "dotenv";
import appointmentModel from "../models/bookAppointment.js";
import userModel from "../models/user.model.js"



export const createAppointment = async (req, res) => {
    try {

        const userId = req.id;
        const doctorId = req.params.id;

        //only pateint can create appointment
        if (req.role !== "PATIENT") {
            return res.status(403).json({
                message: "Only patients can create appointments",
                success: false
            });
        }

        //doctor is exist or not
        const doctor = await userModel.findById(doctorId);

        if (!doctorId || doctor.role !== "DOCTOR") {
            return res.status(400).json({ message: 'doctor not found', success: false })
        }

        //no dublicate appointmnet will happen
        const existing = await appointmentModel.findOne({
            patient: userId,
            doctor: doctorId
        });

        if (existing) {
            return res.status(400).json({
                message: "Appointment already exists",
                success: false
            });
        }

        const newApnt = await appointmentModel.create({
            patient: userId,
            doctor: doctorId
        })

        return res.status(201).json({
            message: "Appointment created",
            success: true,
            newApnt
        })


    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Error found while creating appointment",
            success: false
        })
    }
}

export const getAllAppointmnet = async (req, res) => {
    try {
        const userId = req.id;

        if (!userId) {
            return res.status(400).json({ message: 'user not found', success: false })
        }

        if (req.role !== "DOCTOR") {
            return res.status(403).json({
                message: "Only doctors are access to all appointments",
                success: false
            });
        }

        const getAll = await appointmentModel.find({ doctor: userId }).populate({
            path: 'patient',
            select: 'name'
        }).populate({
            path: 'doctor',
            select: 'name'
        })

        return res.status(201).json({
            message: "all appointmnet",
            success: true,
            getAll
        })


    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Error found while getting appointment",
            success: false
        })
    }
}

export const updateStatus = async (req, res) => {
    try {
        const { appointmentId, status } = req.body;



        if (req.role !== "DOCTOR") {
            return res.status(403).json({
                message: "Only doctors are allowed to update status",
                success: false
            });
        }
        if (!appointmentId || !status) {
            return res.status(400).json({
                message: "All fields required",
                success: false
            });
        }

        const updatedData = await appointmentModel.findByIdAndUpdate(
            appointmentId,
            { status },
            { returnDocument: "after" }
        );

        return res.status(200).json({
            message: "Status updated successfully",
            success: true,
            updatedData
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Error found while updting status",
            success: false
        })
    }
}