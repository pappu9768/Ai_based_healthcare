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
    },
    verifiedDoctor:{
        type:Boolean,
        default:false
    }

},{
    timestamps: true
})

const doctorProfileModel = new mongoose.model('doctorInfo',doctorInfoSchema);

export default doctorProfileModel