import { hashPassword } from "../helpers/authHelper";
import userModel from "../models/userModel";

const registerController= async (req,res)=>{

    try{

        const {name, email, password,phone}=req.body;

        //checking validations, 
        if(!name) return res.send({error:"name required"});
        if(!password) return res.send({error:"password required"});
        if(!email) return res.send({error:"email required"});
        if(!phone) return res.send({error:"phone required"});

        //checking existing user
        const existingUser= await userModel.findOne({email:email});
        if(existingUser) return res.status(200).send({
            success:true,
            message:"This email is already registered, please login in"
        })

        //registering user
        const hassedPassword= await hashPassword(password);
        const user= new userModel({name:name, email:email, password:hashPassword,phone:phone}).save();
        res.status(201).send({
            success:true,
            message:" User Registered successfully",
            user
        })




    }catch (err){
        console.log(err);
        res.status(500).send({
            success: false,
            message:"Registraion error",
            err
        })
    }

}

export default registerController;

