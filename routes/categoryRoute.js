import express from 'express'
import {requireSignIn, isAdmin} from '../middlewares/index.js'
import { createCategoryController, getAllCategories, singleCategory } from '../controllers/categoryController.js'

const categoryRouter= express.Router();


//..................................GET...................

//get all categories
categoryRouter.get('/categories', getAllCategories)
categoryRouter.get('/categories/:slug',singleCategory);  // the :slug word can be accessed in controller using req.params.slug


//.................................POST...................

//create catagory
categoryRouter.post('/create-category',requireSignIn,isAdmin, createCategoryController );





export default categoryRouter;