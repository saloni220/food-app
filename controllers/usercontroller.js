const { object } = require("joi");
const { UserModel, schema } = require("../models/usermodel");
const bcrypt = require("bcrypt");
const sendMail = require("../utils/sendmail");
const usermodel = require("../models/usermodel");
// GET USER INFORMATION
const getusercontroller = async (req, res) => {
  try {
    //find user
    const user = await UserModel.findOne({ _id: req.params._id });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }
    // console.log("email : ", email)
    console.log(user);
    //hide passward
    user.passward = undefined;
    res.status(200).send({
      success: true,
      message: "user data fetched successfully",
      user,
    });
    await sendMail(
      user.email,
      "your data fetch successfully",
      `Dear ${user.username},\n\nYour data fetch successfully in our Food App.\n\nThank you!`
    );
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in get user API",
      error,
    });
  }
};
// UPDATE USER PROFILE
const updateusercntroller = async (req, res) => {
  try {
    //find user
    const user = await UserModel.findById({ _id: req.params._id });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }
    //update user
    const { username, phone, address } = req.body;
    if (username) {
      user.username = username;
    }
    if (phone) {
      user.phone = phone;
    }
    if (address) {
      user.address = address;
    }
    await user.save();
    res.send({
      success: true,
      message: "User profile updated successfully",
      user,
    });
    sendMail(
      user.email,
      "Profile Updated Successfully",
      `Dear ${username},\n\nYour profile has been updated successfully.\n
    Thank you!`
    );
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in update user API",
      error,
    });
  }
};
//update passward
const updatepasswordcontroller = async (req, res) => {
  try {
    //find user
    const user = await UserModel.findById({ _id: req.params._id });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }
    //get data from user
    const { oldpassward, newpassward } = req.body;
    //validation
    if (!oldpassward || !newpassward) {
      return res.status(400).send({
        success: false,
        message: "Please provide old and new passward",
      });
    }
    //check old passward
    const isMatch = await bcrypt.compare(oldpassward, user.passward);
    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "old passward is not match",
      });
    }
    user.passward = newpassward;
    //hashing new passward
    const hashpassward = await bcrypt.hash(newpassward, 12);
    user.passward = hashpassward;
    await user.save();
    res.status(200).send({
      success: true,
      message: "passward updated successfully",
    });
    sendMail(
      user.email,
      "Passward Updated Successfully",
      `Dear ${user.username},\n\nYour passward has been updated successfully.\n
       Thank you!`
    );
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in update passward API",
      error,
    });
  }
};
//reset password
const resetpasswordcontroller = async (req, res) => {
  try {
    //get email from body
    const { email, answer, newpassward } = req.body;
    //validation
    if (!email || !answer || !newpassward) {
      return res.status(400).send({
        success: false,
        message: "please provide email, answer and new passward",
      });
    }
    const User = await UserModel.findOne({ _id: req.params._id });
    if (!User) {
      return res.status(404).send({
        success: false,
        message: "user not found or answer is incorrect ",
      });
    }
    //hashing new passward
    const hashpassward = await bcrypt.hash(newpassward, 12);
    User.passward = hashpassward;
    await User.save();
    res.status(200).send({
      success: true,
      message: "passward reset successfully",
    });
    //send mail
    sendMail(
      User.email,
      "Passward Reset Successfully",
      `Dear ${User.username},\n\nYour passward has been reset successfully.\n
       Thank you!`
    );
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in reset passward API",
      error,
    });
  }
};
//delete user profile
const deletusercontroller = async (req, res) => {
  try {
    const user = await UserModel.findById({ _id: req.params._id });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }
    //send mail
    await sendMail(
      user.email,
      "Account Deleted Successfully",
      `Dear ${user.username},\n\nYour account has been deleted successfully.\n
       Thank you!`
    );

    await UserModel.deleteOne(user);
    return res.status(200).send({
      success: true,
      message: "your account has been deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in delete user API",
      error,
    });
  }
};
module.exports = {
  getusercontroller,
  updateusercntroller,
  updatepasswordcontroller,
  resetpasswordcontroller,
  deletusercontroller,
};
