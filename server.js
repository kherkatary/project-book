import Express from "express";
import dotenv from "dotenv";

dotenv.config()
const app= Express();

app.get("/",(req,res)=>{
    res.send({"message":"Hellow"});
})

const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log("server running on port "+ PORT)
})