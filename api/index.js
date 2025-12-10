//passwor - ilikeit

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'

dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to Mongoose");
})
.catch((err)=>{
    console.log(err)
});
const app = express();

//allow json as input of the server
app.use(express.json());
app.listen(3000,()=>{
    console.log('server is running at port 3000');
});

//create from here

// app.get('/test',(req,res)=>{
//     res.send("hello world");
// })

// app.get('/',(req,res)=>{
//     res.send("euhgeriug");
// })

//call to user routes
app.use("/api/user",userRouter)

app.use("/api/auth",authRouter);


//midddle ware error 

app.use((err,req,res,next)=>{

    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })//use in auth control js
})

import userRoutes from "./routes/user.route.js";

app.use("/api/user", userRoutes);
