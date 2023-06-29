import categoryModel from '../models/categoryModel.js'
import slugify from 'slugify';

const createCategoryController = async (req, res) => {

    try {

        const { name } = req.body;

        if (!name) return res.send(401).send({
            message: "Name is required",
            success: false
        })


        const existingCategory = await categoryModel.findOne({ name });

        if (existingCategory) {

            return res.status(200).send({
                message: "category already exists",
                success: true,
                existingCategory
            })
        }

        const newCategory = await new categoryModel({ name, slug: slugify(name) }).save()

        return res.status(201).send({
            message: "new category has been created",
            success: true,
            newCategory
        })



    } catch (err) {
        console.log(`An error occured:- ${err}`);
        res.status(500).send({
            message: "error creating category, try again",
            success: false,
            err
        })
    }

}


const getAllCategories = async (req, res) => {

    try {

        const categories = await categoryModel.find({});

        if(!categories) return res.send({message:"no categories available"});

        return res.status(401).send({
            success:true,
            message:"All category list",
            categories
        })


    } catch (err) {

        console.log("error in getting (catch error) all categories");
        res.status(500).send({
            success: false,
            message: " (catch error) error getting all categories"
        })

    }
}

const singleCategory=async (req,res)=>{

    try {

        const category= await categoryModel.findOne({slug:req.params.slug})
        if(!category) return res.status(401).send({
            success:false,
            message:"error finding the category, (check spelling or try again)"
        })

        res.status(400).send({
            success:true,
            message:`fetched catagory :${category.name}`,
            category

        })

        
    } catch (error) {

        console.log("catch error");
        res.status(500).send({
            success:false,
            message:"catch error in single category fetching"
        })
        
    }

}


export { createCategoryController, getAllCategories, singleCategory };