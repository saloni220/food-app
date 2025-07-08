const Joi = require("joi");
const { schema } = require("../models/usermodel");
const validation = (req, res, next) => {
  const { username, email, passward, address, phone,role } = req.body;
  const { error } = schema.validate({
    username,
    email,
    passward,
    address,
    phone,
    // role
  });

  if (error) {
    return res.status(400).send({
      success: false,
      message:  "Validation error",
      error
    });
  }
  next();
};
module.exports = validation;
