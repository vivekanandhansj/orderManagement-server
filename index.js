import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import orderRoutes from "./routes/orders.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
const app = express()
dotenv.config()

const connect=() =>{
    mongoose.connect(process.env.MONGO).then(()=>{
        console.log("connected to DB!")
    }).catch((err)=>{throw err;});
};
app.use(cors({
    origin:"*"
}))

app.use(cookieParser())
app.use(express.json())
app.use("/api/auth",authRoutes )
 app.use("/api/order", orderRoutes)


// error handling
app.use((err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        success:false,
        status,
        message
    })
})
app.listen(process.env.PORT,()=>{
    connect()
    console.log("connected to server!")
})
 