import mongoose from "mongoose";

const connectDB= async()=>{
    try{
        const conn=await mongoose.connect(process.env.mongo_url)
        console.log(`server connected to mongodb database host:  ${conn.connection.host}`)

    }catch(error){
        console.log(`error from mongo db:- ${error} `)
    }
}


export default connectDB