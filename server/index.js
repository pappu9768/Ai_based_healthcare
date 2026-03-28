import express from 'express'
import { configDotenv } from 'dotenv'
import mongoose from 'mongoose';
import router from './src/routes/user.routes.js';
configDotenv();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { tokenCheck } from './src/middleware/tokenCheck.js';
const app = express()



//imp middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))





//routes
app.use('/api/v1/auth', router);

app.get('/name',tokenCheck,async(req,res) => {
    try {
        const userName = req.name;
        const role = req.role
        return res.status(200).json({
            msg:"name",
            userName,
            role
        })
    } catch (error) {
        return res.status(400).json({
            msg:"internal server error",
            success: false
        })
    }
})










const connectDB = async () => {
    try {
        const url = process.env.MONGO_URI
        const conn = await mongoose.connect(url);
        console.log(`Database Connected : ${conn.connection.host} `)
        // console.log(process.env.GROQ_API_KEY)
    } catch (error) {
        console.log("Error Found", error)
    }
}

const port = process.env.PORT
app.listen(port, () => {
    connectDB();
    console.log(`Server is running on ${port}`);
})