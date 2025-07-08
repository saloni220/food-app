const { string, boolean } = require("joi");
const mongoose = require("mongoose");
//schema for restaurant
const restaurantSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Restaurant title is required"],
    },
    imageUrl: {
      type: String,
      default: "",
    },
    foods: {
      type: Array,
    },
    time: {
      type: String,
    },
    pickup: {
      type: Boolean,
      default: true,
    },
    delivery: {
      type: Boolean,
      default: true,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      default: 1,
      min: 1,
      max: 5,
    },
    rattingCount: {
      type: String,
    },
   address:{
    type: String,
    required: [true, "Restaurant address is required"],
   }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Restaurant", restaurantSchema);
