import mongoose from "mongoose";

const categorySchema = mongoose.Schema({

    name:{
        type:String,
        required:true,
        unique:true
    },
    
    //slugged verion of name is stored here
    slug:{
        type:String,
        lowercase:true
    }




},{timestamps:true})

export default mongoose.model('Categories', categorySchema);