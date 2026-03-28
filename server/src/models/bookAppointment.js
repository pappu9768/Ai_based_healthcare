import mongoose from 'mongoose'

const appointmentSchema = new mongoose.Schema({
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    status:{
        type:String,
        enum:['pending','accepted','rejected'],
        default:'pending'
    }
},{
    timestamps: true
})

const appointmentModel = new mongoose.model('appointment',appointmentSchema);

export default appointmentModel;