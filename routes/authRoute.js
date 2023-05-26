import  express  from "express";
import registerController from "../controllers/authController.js";


// router Object
const router = express.Router();
 
// Router for Register || Post method
router.post("/register", registerController)


export default router


