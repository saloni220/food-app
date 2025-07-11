const { required, string } = require("joi");
const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "category is required"],
  },
  imageUrl: {
    type: String,
    default:
      "https://www.google.com/imgres?q=restaurant%20logo%20food&imgurl=https%3A%2F%2Fpng.pngtree.com%2Fpng-clipart%2F20220604%2Foriginal%2Fpngtree-restaurant-logo-png-image_7932128.png&imgrefurl=https%3A%2F%2Fpngtree.com%2Ffreepng%2Frestaurant-logo_7932128.html&docid=gQYeyUdIZrO_NM&tbnid=y2coIKo-mH_QBM&vet=12ahUKEwjVxZ2iu7KOAxVzbmwGHftGKosQM3oECBsQAA..i&w=1200&h=1200&hcb=2&ved=2ahUKEwjVxZ2iu7KOAxVzbmwGHftGKosQM3oECBsQAA",
  },
},{timestamps:true});
module.exports = mongoose.model("category", categorySchema);
