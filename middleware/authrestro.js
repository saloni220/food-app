const { UserModel } = require("../models/usermodel");
const jwt = require("jsonwebtoken");

const userRole = async (req, res, next) => {
  //   console.log("role ->> ", req);
  console.log("user = > ",  req.user);
  if (req.user.role==='customer') {
    return res.status(400).send({
      success: false,
      message: "you can not add restaurant",
    });
  }
  next();
};
module.exports = userRole;
