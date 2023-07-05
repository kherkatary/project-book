import express from 'express'
import { createProduct } from '../controllers/productController.js';
import { isAdmin, requireSignIn } from '../middlewares/authmiddleware.js';
import formidable from 'express-formidable';  // middleware for uploading photos
import multer from 'multer'


const productRouter= express.Router();

const upload= multer({ dest: 'uploads/' });

//........................GET routes..............................



//........................POST routes .............................

//create-products
productRouter.post('/create-product',requireSignIn, isAdmin,upload.single('photo'), createProduct)


export default productRouter;