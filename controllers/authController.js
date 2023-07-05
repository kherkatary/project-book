import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

const registerController = async (req, res) => {

    try {

        const { name, email, password, phone } = req.body;

        //checking validations, 
        if (!name) {return res.send({ message: "name required" });}
        if (!password){ return res.send({message: "password required" });}
        if (!email) {return res.send({ message: "email required" });}
        if (!phone) {return res.send({ message: "phone required" });}

        //checking existing user
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) return res.status(200).send({
            success: true,
            message: "This email is already registered, please login in"
        })

        //registering user
        const hassedPassword = await hashPassword(password);
        const user = await new userModel({ name: name, email: email, password: hassedPassword, phone: phone }).save();
        res.status(201).send({
            success: true,
            message: " User Registered successfully",
            user
        })




    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Registraion error",
            err
        })
    }

}

const loginController = async (req, res) => {

    try {

        const { email, password } = req.body;
        // validation
        if (!email || !password) return res.status(404).send({
            success: false,
            message: "required email & password",

        })

        const user=await userModel.findOne({email:email});

        if(!user) return res.status(404).send({
            success:false,
            message:"email not registered"
        })

        const matchPassword= await comparePassword(password,user.password)

        if(!matchPassword) return res.status(200).send({
            success:false,
            message:'incorrect password'
        })

        const token= JWT.sign({_id:user._id},process.env.jwt_encryptKey,{expiresIn:'7d'});
        res.status(200).send({
            success:true,
            message:"login successfull",
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                role: user.role
            },
            token
        })


    } catch (err) {
        console.log(`failed: ${err}`);
        res.status(500).send({
            success: false,
            message: "error in login",
            err
        })

    }

}


const testController= (req,res)=>{

    res.send("protected routed, only accessible if all the middlewares were passed");

}


export { registerController, loginController,testController}

