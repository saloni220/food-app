const foodModel = require("../models/foodModel");
//create food
const createFoodController = async (req, res) => {
  try {
    const {
      title,
      foodTag,
      category,
      code,
      isAvailable,
      retaurant,
      rating,
      discription,
      price,
    } = req.body;
    //vallidation
    if (!title || !discription || !price || !retaurant) {
      return res.status(400).send({
        success: false,
        message: "please provide all required field",
      });
    }
    const newfood = new foodModel({
      title,
      foodTag,
      category,
      code,
      isAvailable,
      retaurant,
      rating,
      discription,
      price,
    });
    await newfood.save();
    res.status(201).send({
        success:true,
        message:'food is created successfully',
        newfood
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in create food API",
      error
    });
  }
};
//get all food
const getAllfood = async(req,res)=>{
    try {
        const allfood = await foodModel.find({})
        if(!allfood){
            return res.status(404).send({
                success:false,
                message:'food not found'
            })
        }
        res.status(200).send({
            success:true,
            message:'food found successfully',
            allfood
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"errpr in get all food API"
        })
    }
}
const getOneFood= async(req,res)=>{
    try {
        const foodId=await foodModel.findById(req.params._id).populate("retaurant");
        console.log(foodId)
        if(!foodId){
            return res.status(404).send({
                success:false,
                message:'food not found'
            })
        }
        res.status(200).send({
            success:true,
            message:'find food successfully',
            foodId
        })

    } catch (error) {
     res.status(500).send({
        success:false,
        message:"error in get one food API",
        error
     })   
    }
}
module.exports = { createFoodController ,getAllfood,getOneFood};
