import mongoose from "mongoose";

const doctorProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    specialty: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    consultationFee: {
        type: String
    },
    
    emergencyNumber:{
        type: Number
    },
    isVerified: {
        type: Number
        // required: true
    }
    // },
    // availability:[{
    //     day:String,
    //     star
    // }]
}, {
    timestamps: true
})

export const doctorProfileModel = new mongoose.model('DoctorProfile',doctorProfileSchema);