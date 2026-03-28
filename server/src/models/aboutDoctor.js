import mongoose from 'mongoose'

const doctorInfoSchema = new mongoose.Schema({
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    specialization:[{
        type:String
    }],
    experience:{
        type:Number,
        
    },
    licenseNumber: {
        type:Number,
        unique: true
    }

},{
    timestamps: true
})

const doctorInfoModel = new mongoose.model('doctorInfo',doctorInfoSchema);

export default doctorInfoModel