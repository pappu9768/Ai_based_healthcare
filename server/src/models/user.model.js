import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["PATIENT", "DOCTOR"],
        required: true
    },
    isVerified:{
        type:Boolean,
        default: false
    }
    // status: {
    //     type: String,
    //     enum: ["PENDING", "APPROVED", "REJECTED"],
    //     default: "PENDING"
    // },

    //  Only for doctors
    // specialization: [{
    //     type: String,
    //     required: function () {
    //         return this.role === "DOCTOR"
    //     }
    // }],
    // experience: {
    //     type: Number,
    //     required: function () {
    //         return this.role === "DOCTOR"
    //     }
    // },
    // licenseNumber: {
    //     type: String,
    //     required: function () {
    //         return this.role === "DOCTOR"
    //     }
    // }
}, {
    // strict:true,
    timestamps: true
})

const registerModel = new mongoose.model('user', registerSchema);

export default registerModel;
