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
      success: true,
      message: "food is created successfully",
      newfood,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in create food API",
      error,
    });
  }
};
//get all food
const getAllfood = async (req, res) => {
  try {
    const allfood = await foodModel.find({});
    if (!allfood) {
      return res.status(404).send({
        success: false,
        message: "food not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "food found successfully",
      allfood,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "errpr in get all food API",
    });
  }
};
const getOneFood = async (req, res) => {
  try {
    const foodId = await foodModel
      .findById(req.params._id)
      .populate("retaurant");
    console.log(foodId);
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "please provide food id",
      });
    }

    res.status(200).send({
      success: true,
      message: "find food successfully",
      foodId,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in get one food API",
      error,
    });
  }
};
//get food by restaurent
const getFoodByRestaurent = async (req, res) => {
  try {
    const restro_id = await foodModel.find({ _id: req.params._id });
    if (!restro_id) {
      return res.status(400).send({
        success: false,
        message: "please provide id",
      });
    }
    const food = await foodModel.find({ restroId: restro_id });
    if (!food) {
      return res.status(500).send({
        success: false,
        message: "food not found with this id",
      });
    }
    console.log("food == >>> ", food);
    res.status(200).send({
      success: false,
      message: "food find successfully",
      food,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in get food by restaurent in API",
    });
  }
};
//update food controller
const updateFoodControler = async (req, res) => {
  try {
    const foodId = req.params._id;
    if (!foodId) {
      return res.status(400).send({
        success: false,
        message: "provide food id",
      });
    }
    const food = await foodModel.findById(foodId);
    if (food) {
      return res.status(404).send({
        success: false,
        message: "no food found",
      });
    }
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
    
  } catch (error) {
    res.status(500).sent({
      success: false,
      message: "error in update food API",
    });
  }
};
module.exports = {
  createFoodController,
  getAllfood,
  getOneFood,
  getFoodByRestaurent,
  updateFoodControler,
};
