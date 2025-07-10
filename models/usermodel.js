const mongoose = require("mongoose");
const joi = require("joi");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "user name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    passward: {
      type: String,
      required: [true, "passward is required"],
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, "phone number is required"],
    },
    role: {
      type: String,
      enum: ["owner", "admin", "customer"],
      // required:[true,'role is  required'],
      default: "customer",
    },
    profile: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png",
    },
    answer: {
      type: String,
      required: [true, "answer is required"],
    },
  },
  { timestamps: true }
);
const schema = joi.object({
  username: joi.string().required(),
  email: joi.string().email().required(),
  passward: joi.string().min(6).required(),
  address: joi.string(),
  phone: joi.string().length(10).required(),
  role: joi.string().optional(),
});

module.exports = {
  UserModel: mongoose.model("User", userSchema),
  schema,
};
