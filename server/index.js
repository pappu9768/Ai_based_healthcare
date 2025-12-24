import express from 'express'
import { configDotenv } from 'dotenv'
import mongoose from 'mongoose';
import router from './src/routes/user.routes.js';
configDotenv();
import cors from 'cors';
const app = express()



//imp middleware
app.use(express.json());
app.use(cors({
    origin:'http://localhost:5173'
}))





//routes
app.use('/api/v1/auth',router);










const connectDB = async() => {
    try {
        const url = process.env.MONGO_URI
        const conn = await mongoose.connect(url);
        console.log(`Database Connected : ${conn.connection.host} `)
        
    } catch (error) {
        console.log("Error Found",error)
    }
}

const port = process.env.PORT
app.listen(port,() => {
    connectDB();
    console.log(`Server is running on ${port}`);
})