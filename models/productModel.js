import mongoose from "mongoose";

const productSchema= mongoose.Schema({

    name:{
        type:String,
        required:true,
    },

    slug:{
        type:String,
        required:true,   
        lowercase:true     
    },
    description:{
        type:String,
        required:true
    },

    price:{
        type:Number,
        required:true
    },

    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Categories',
        required:true
    },
    quantity:{
        type:Number,
        required: true
    },
    photo:{
        data:Buffer,
        contentType:'string'
    }



},{timestamps:true});

export default mongoose.model('Products', productSchema);
