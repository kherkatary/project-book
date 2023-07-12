import productModel from '../models/productModel.js'
import slugify from 'slugify';
import fs from 'fs'

const createProduct = async (req, res) => {

    try{

        const { name, description, price, category, quantity} = req.body; 
        const photo =req.file;

        // Validations........
        if(!name) return res.status(400).send({error:"name required"});
        if(!description) return res.status(400).send({error:"description required"});
        if(!price) return res.status(400).send({error:"price required"});
        if(!category) return res.status(400).send({error:"category required"});
        if(!quantity) return res.status(400).send({error:"quantity required"});
        if(!photo) res.status(400).send({error:"photo required"});
        
        // .......................................

        const product= new productModel({...req.body, slug: slugify(name)});
        if(photo){
            product.photo.data= fs.readFileSync(photo.path)
            product.photo.contentType= photo.type
        }

        await product.save();


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


const getAllProducts= async (req,res)=>{

    try {
        const products= await productModel.find({}).select("-photo")
        .limit(10)
        .sort({price:1})
        .populate("category") // price:1 means ascending order

    if(!products) return res.status(204).send({ 
      message:"no products found",
      success:true
    })

    return res.status(200).send({
        message:"Sucessfully all products fetched",
        success:true,
        totalProducts: products.length,
        products
    })
        
    } catch (err) {

        res.status(500).send({
            error:err.message
        })
        
    }

    

}

const getSingleProduct= async (req, res)=>{
    try {
        const product= await productModel.find({slug:req.params.slug})
        .select("-photo")
        .populate("category");

        if(!product) res.status(204).send({
            message:"no product found",
            success:true
        })

        return res.status(200).send({
            success:true,
            message:"product found",
            product
        })
        
    } catch (err) {

        res.status(500).send({
            error:err.message,
            message:"internal server error"
        })
        
    }
}

const getProductPhoto= async (req,res)=>{
    try{
        const productPhoto= await productModel.findById(req.params.id).select("photo")

        if(!productPhoto.photo.data) return res.status(204).send({
            error:"product not found",
            success:true
        })

        res.set("content-type", productPhoto.photo.contentType)
        return res.status(200).send(productPhoto.photo.data)

    } catch (err){

        return res.status(500).send({
            error:err.message,
            message:"internal server error"
        })

    }
}

const updateProduct = async (req, res) => {

    try{

        const { name, description, price, category, quantity} = req.body; 
        const photo =req.file;

        // Validations........
        if(!name) return res.status(400).send({error:"name required"});
        if(!description) return res.status(400).send({error:"description required"});
        if(!price) return res.status(400).send({error:"price required"});
        if(!category) return res.status(400).send({error:"category required"});
        if(!quantity) return res.status(400).send({error:"quantity required"});
        if(!photo) res.status(400).send({error:"photo required"});
        
        // .......................................

        const product= await productModel.findByIdAndUpdate(req.params.id,{...req.body, slug: slugify(name)}, {new:true});
        if(photo){
            product.photo.data= fs.readFileSync(photo.path)
            product.photo.contentType= photo.type
        }

        await product.save();


        return res.status(200).send({
            message:"product Updated successfully",
            success:true,
            product
        })

    } catch(err){
        return res.status(500).send({
            message: "internal server error",
            success:false,
            error:err.message
        })
    }


}

const deleteProduct= async (req,res)=>{

    try{

        await productModel.findByIdAndDelete(req.params.id);
        res.status(202).send({
            success:true,
            message:'Product successfully deleted'
        })
        

    } catch(err){
        return res.status(500).send({
            message:"internal server error",
            error:err.message
        })
    }

}

export { createProduct, getAllProducts, getSingleProduct, getProductPhoto , updateProduct,deleteProduct}