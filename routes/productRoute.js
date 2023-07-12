import express from 'express'
import multer from 'multer'
import { isAdmin, requireSignIn } from '../middlewares/authmiddleware.js';
import * as controller from '../controllers/productController.js';


const productRouter= express.Router();

const upload= multer({ dest: 'uploads/' });


//get all products
productRouter.get("/all-products",controller.getAllProducts )
//get single product 
productRouter.get("/get-product/:slug", controller.getSingleProduct);
//get product photo
productRouter.get("/get-product-photo/:id", controller.getProductPhoto);
//create-products
productRouter.post('/create-product',requireSignIn, isAdmin,upload.single('photo'), controller.createProduct)
//Update product
productRouter.post("/update-product/:id", requireSignIn,isAdmin, upload.single('photo'),controller.updateProduct)
//delete product 
productRouter.delete("/delete-product/:id",requireSignIn,isAdmin, controller.deleteProduct)


export default productRouter;