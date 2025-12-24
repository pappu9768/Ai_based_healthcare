import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
},{
    timestamps:true
})

const registerModel = new mongoose.model('user',registerSchema);

export default registerModel;
