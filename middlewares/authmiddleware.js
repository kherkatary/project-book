import JWT from 'jsonwebtoken'
import userModel from '../models/userModel.js';

//----  middle ware for tokken comparision (for login)

const requireSignIn = async (req, res, next) => {

    try {

        const decode = JWT.verify(
            req.headers.authorization,
            process.env.jwt_encryptKey
        )

        //decoding user from tokken 
        req.user = decode;
        //next function
        next()

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error in tokken verification"
        })
    }

}

const isAdmin = async (req, res, next) => {

    try {

        const user = await userModel.findById(req.user._id);

        if(!user) res.send(400).send({
            message:"error user not found by admin middleware"
        })

        if (user.role !== 1) return res.status(401).send({
            success: false,
            message: " Unauthorized access, you are not an ADMIN"
        });

        else next();


    } catch (error) {

        console.log(`Error checking Role: ${error}`);
        res.status(500).send({
            success: false,
            message: "ERROR is admin middleware",
            error
        })

    }



}


export { requireSignIn, isAdmin }
