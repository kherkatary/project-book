import mongoose from "mongoose";

const userSchema= new mongoose.Schema({

    name:{
        type: String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required: true,
        unique:true
    },

    password:{
        type: String,
        required:true,
    },
    phone:{
        type:String,
        required:true

    },
    adddress:{
        type:String,
    
    },
    role:{
        type:Number,
        default:0
    }


},{timestamps:true})
//time stamps do what thier name suggests : stamping the created time of a user


export default mongoose.model('user',userSchema)