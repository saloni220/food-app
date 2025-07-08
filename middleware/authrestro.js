const { UserModel } = require("../models/usermodel");
const jwt = require('jsonwebtoken')

const userRole = async (req, res, next) => {
  console.log("role ->> ", req.user.role);

  if (req.user.role !== "admin" || req.user.role !== "owner") {
    return res.status(400).send({
      success: false,
      message: "you can not add restaurant",
    });
    next();
  }
};
module.exports = userRole;
