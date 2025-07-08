const JWT = require("jsonwebtoken");
module.exports = async (req, resp, next) => {
  try {
    //get token
    // console.log(req.headers["authorization"])
    const token = req.headers["authorization"]?.startsWith("bearer ")
      ? req.headers["authorization"].split(" ")[1]
      : null;
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        console.log(process.env.JWT_SECRET);
        return resp.status(401).send({
          success: false,
          message: "Unauthorized user or invalid token",
        });
      } else {
        req.user = decode.id; 
        next(); 
      }
    });
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      success: false,
      message: "error in auth API",
      error,
    });
  }
};
