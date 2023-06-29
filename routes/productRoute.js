import express from 'express'
import { createProduct } from '../controllers/productController.js';


const productRouter= express.Router();

//........................GET routes..............................



//........................POST routes .............................

//create-products
productRouter.post('/create-product', createProduct)


export default productRouter;