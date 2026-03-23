import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim: true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type: String,
        enum: ["PATIENT","DOCTOR"],
        required:true
    },
    
},{
    timestamps:true
})

const registerModel = new mongoose.model('user',registerSchema);

export default registerModel;
