const categorModel = require("../models/categoryModel");
const usermodel = require("../models/usermodel");
const { use } = require("../routes/categoryRoute");
//category controller
const createCategory = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    //validation
    if (!title) {
      return res.status(400).send({
        success: false,
        message: "please provide category title pr imgae",
      });
    }
    const newCategory = new categorModel({ title, imageUrl });
    await newCategory.save();
    res.status(201).send({
      success: true,
      message: "category has been created",
      newCategory,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in create categor API",
    });
  }
};
//get all category
const getallcategory=async(req,res)=>{
  try {
    const category=await categorModel.find({})
    if(!category){
      return res.status(404).send({
        success:false,
        message:"no category found"
      })
    }
    res.status(200).send({
      success:true,
      message:"category of restaurant found successfully",
      category
    })
  } catch (error) {
    res.status(500).send({
      success:false,
      message:'error in get all category API'
    })
  }
}
//get single category
const getSingleCategory=async(req,res)=>{
  try {
    const Categorytitle=await categorModel.findById({_id:req.params._id})
    if(!Categorytitle)
    {
      return res.status(404).send({
        success:false,
        message:'no category found '
      })
    }
    res.status(200).send({
      success:true,
      message:'category found successfully',
      Categorytitle
    })
  } catch (error) {
    res.status(500).send({
      success:false,
      message:'error in get single category API'
    })
  }
}
//delete category
const deleteCategory = async(req,res)=>{
  try {
    const categoryId= await categorModel.findById({_id:req.params._id})
    if(!categoryId)
    {
      return res.status(404).send({
        success:false,
        message:'not found category please provide category id'
      })
    }
    await categorModel.deleteOne(categoryId)
    res.status(200).send({
      success:true,
      message:'category deleted successfully'
    })
  } catch (error) {
    res.status(500).send({
      success:false,
      message:'error in delete category API',
      error
    })
  }
}
//update category
const updateCategory=async(req,res)=>{
  try {
    const up_cat= await categorModel.findById(req.params._id)
    if(!up_cat){
      return res.status(404).send({
        success:false,
        message:'category not found'
      })
    }
    const{title,imageUrl}=req.body
    if(title){
      up_cat.title=title
    }
    if(imageUrl){
      up_cat.imageUrl=imageUrl
    }
    await up_cat.save();
    res.status(200).send({
      success:true,
      message:'category updated successfully'
    })
  } catch (error) {
    res.status(500).send({
      success:false,
      message:'error in Update category API',
      error
    })
  }
}
module.exports = {
 createCategory,
  getallcategory,
  getSingleCategory,
  deleteCategory,
  updateCategory,
};
