import  express  from "express";
import {registerController, loginController}from "../controllers/authController.js";



// router Object
const router = express.Router();
 
// Router for Register || Post method
router.post('/register',registerController)

// Route for Login || POST
router.post("/login",loginController)


export default router


