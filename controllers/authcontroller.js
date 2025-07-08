const { UserModel, schema } = require("../models/usermodel");
const sendMail = require("../utils/sendmail");

const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const joi = require("joi");
const userRole = require("../middleware/authrestro");
const registerController = async (req, res) => {
  try {
    //take data from body
    const { username, email, passward, address, phone, answer,role} = req.body;
    const validroles=['admin','owner','customer']
    // console.log("role : ",role)
     if(role){
      if(!validroles.includes(role)){
        return res.status(400).send({
          success:false,
          message:`Invalid role \nplease enter valid role(admin,owner,customer)`
        })
      }
    }
    //if user not enter data
    if (!username || !email || !passward || !address || !phone || !answer) {
      return res.status(400).send({
        success: false,
        message: "please provide all information",
      });
    }
    //check by email user is register or not
    const existing = await UserModel.findOne({ email });
    if (existing) {
      return res.status(400).send({
        success: false,
        message: "email already register please login",
      });
    }
    //hqasing passward
    const hashpassward = await bcrypt.hash(passward, 12);

    //create new user
    const user = await UserModel.create({
      username,
      email,
      passward: hashpassward,
      address,
      phone,
      answer,
      role
    });
    //send mail
    await sendMail(
      email,
      "Registration Successful",
      `Dear ${username},\n\nYou are successfully registered to our Food App.\n\nThank you!`
    );
    //validaation

    if (user) {
      return res.status(200).send({
        success: true,
        message: "succesfully register",
        user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in register API",
      error,
    });
  }
};
const loginController = async (req, res) => {
  try {
    const { username, email, passward } = req.body;
    //validation
    if (!email || !passward) {
      return res.status(400).send({
        success: false,
        message: "please provide EMAIL OR PASSWARD",
      });
    }
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }
    //password
    console.log(user);
    const isMatch = await bcrypt.compare(passward, user.passward);
    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "invalid Credential",
      });
    }
    const token = JWT.sign({ tkn:{
      id: user._id,
      role:user.role
    } }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    user.passward = undefined;
    res.status(200).send({
      success: true,
      message: "login successfully",
      token,
      user,
    });
      await sendMail(
      email,
      "Login Successful",
      `Dear ${username},\n\nYou have successfully logged into our Food App.\n\nThank you!`
    );
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in login API ",
      error,
    });
  }
};
module.exports = { registerController, loginController };
