import mongoose from 'mongoose';

const messageDiagnoseSchema = new mongoose.Schema({

    sender:{
        type:String,
        enum:["user","ai"],
        required: true
    },
    text:{
        type:String,
        required:true
    },
    created_At:{
        type:Date,
        default:Date.now
    }

})


const conversationSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    title:{
        type:String,
        required:true
    },
    messages:[messageDiagnoseSchema]
},{
    timestamps:true
})

const conversationModel = new mongoose.model('conversation',conversationSchema)

export default conversationModel