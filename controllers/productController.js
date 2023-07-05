import productSchema from '../models/productModel.js'
import slugify from 'slugify';
import fs from 'fs'

const createProduct = async (req, res) => {

    try{

        const { name, description, price, category, quantity} = req.body; // fields come from formidable middleware dependency in product route
        const photo= req.file

        // Validations........
        if(!name) return res.status(400).send({error:"name required"});
        if(!description) return res.status(400).send({error:"description required"});
        if(!price) return res.status(400).send({error:"price required"});
        if(!category) return res.status(400).send({error:"category required"});
        if(!quantity) return res.status(400).send({error:"quantity required"});
        if(!photo) res.status(400).send({error:"photo required"});
        
        // .......................................

        const product=await new productSchema({...req.body, slug: slugify(name)});
        if(photo){
            product.photo.data= fs.readFileSync(photo.path)
            product.photo.contentType= photo.type
        }

        product.save();


        return res.status(200).send({
            message:"product created successfully",
            success:true,
            product
        })

    } catch(error){
        console.log("Caught error in creating product");
        return res.status(500).send({
            message: "caught error in creating product",
            success:false
        })
    }


}

export { createProduct }