const RestaurantModel = require("../models/Restaurantmodel");
// create retuarent controller
const createRestuarantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      rating,
      rattingCount,
      address,
    } = req.body;
    // validation
    if (!title || !address) {
      return res.status(404).send({
        success: false,
        message: "Please provide all fields",
      });
    }
    const Restaurant = new RestaurantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      rating,
      rattingCount,
      address,
    });
    await Restaurant.save();
    res.status(201).send({
      success: true,
      message: "Restaurant created successfully",
      // restaurant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating restaurant API",
      error,
    });
  }
};
const getAllRestaurantsController = async (req, res) => {
  try {
    const Restaurant = await RestaurantModel.find({});
    if (!Restaurant)
      // ← you're using 'restaurant' here
      return res.status(404).send({
        success: false,
        message: "No restaurants found",
      });

    res.status(200).send({
      success: true,
      totalCount: Restaurant.length,
      message: "Restaurants fetched successfully",
      Restaurant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in fetching restaurants",
      error,
    });
  }
};
const getSingleRestaurantController = async (req, res) => {
  try {
    // const restaurantId = req.params._id;
    // find restaurant by id
    const restaurant = await RestaurantModel.findById({ _id: req.params._id });
    // validation
    if (!restaurant) {
      return res.status(400).send({
        success: false,
        message: "Restaurant ID is required",
      });
    }
    res.status(200).send({
      success: true,
      message: "Restaurant fetched successfully",
      restaurant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in fetching single restaurant",
      error,
    });
  }
};

module.exports = {
  createRestuarantController,
  getAllRestaurantsController,
  getSingleRestaurantController,
};
