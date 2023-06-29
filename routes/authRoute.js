import  express  from "express";
import {registerController, loginController,testController}from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authmiddleware.js";



// authRouter Object
const authRouter = express.Router();
 
// Router for Register || Post method
authRouter.post('/register',registerController)

// Route for Login || POST
authRouter.post("/login",loginController)

//test route for tokken authorization
authRouter.get("/test", requireSignIn, isAdmin ,testController);

//forgot password routed -------- to be added

// Protected routes for user, eg- dashboard
authRouter.get("/user-auth", requireSignIn, (req,res)=>{
    res.status(200).send({
        ok:true
    })
})

// Protected routes for user, eg- admin dashboard
authRouter.get("/admin-auth", requireSignIn, isAdmin, (req,res)=>{
    res.status(200).send({
        ok:true
    })
})

export default authRouter


