import bcrypt from 'bcrypt'

const hashPassword= async (userPassword)=>{
    try{
        const salts= 10;
        const hashedPassword= await bcrypt.hash(userPassword,salts);
        return hashedPassword;

    } catch (err){
        console.log(`hasing password failed: \n ${err}`);
    }
}


const comparePassword= async (userPassword,hashedPassword)=>{

    return bcrypt.compare(userPassword,hashedPassword)
    
}


export {hashPassword,comparePassword}