const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const {
  createRestuarantController,
  getAllRestaurantsController,
  getSingleRestaurantController,
  deleteRestaurantController,
} = require("../controllers/RestaurantController");
// const authorizeRoles = require("../middleware/authrestro");
const userRole = require("../middleware/authrestro");

const router = express.Router();

// create restaurant
router.post("/create", authMiddleware,userRole,createRestuarantController);
//get all restaurant
router.get('/getall',getAllRestaurantsController)
//get single restaurant
router.get('/getone/:_id',getSingleRestaurantController)
//delete restaurant
router.delete('/delete/:_id',authMiddleware,userRole,deleteRestaurantController)

module.exports = router;

