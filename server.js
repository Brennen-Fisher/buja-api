import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import listRoute from "./routes/list.route.js";
import bcrypt from "bcrypt";
import cors from "cors";
import cookieParser from "cookie-parser";   
import {connectionString } from "./mongo.js";


const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true}));
app.use(express.json());
app.use(cookieParser());
mongoose.set('strictQuery', true);

const connect = async () => {
    try {
        await mongoose.connect(connectionString);
        console.log("connected");
    } catch (error) {
        console.log("error");
        console.log(error);
    }
}

app.use("/api/user",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/list",listRoute);

app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "something went wrong";

    return res.status(errorStatus).send(errorMessage);
})

app.listen(8800, () => {
    connect();
    console.log("Backend Server Is Running");
});