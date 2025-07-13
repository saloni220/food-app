const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const userRole = require("../middleware/authrestro");
const {
  createFoodController,
  getAllfood,
  getOneFood,
} = require("../controllers/foodControler");

//create()
router.post("/createFood", authMiddleware, userRole, createFoodController);
//get all food
router.get("/getAllfood", getAllfood);
//get food by id
router.get('/getOneFood/:_id',getOneFood)

module.exports = router;
