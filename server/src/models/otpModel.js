import { model, Schema } from "mongoose";

const otpSchema = new Schema({
    otp: { type: String, required: true },
    email: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 300 }
})

const otpModel = model('OTP',otpSchema);

export default otpModel;