import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoute.js"




dotenv.config()
//database connection
connectDB();

const app= express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))


//ALL Routes before apis
app.use("/api/v1/auth", authRouter);


//APIS
app.get("/",(req,res)=>{
    res.send("hello")
})

const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log("server running on port "+ PORT)
})