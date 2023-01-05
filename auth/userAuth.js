const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config");
const User = require("../utils/models/signup_modal");

const userAuth = async (req, res, next) => {
  try {
    const comingToken = req.header("Authorization");
    const token = comingToken.replace("Barer ", "");
    console.log(token);
    const jwtPayload = jwt.verify(token, jwt_secret);
    // console.log(jwtPayload)
    const user = await User.findOne({_id : jwtPayload._id})
    console.log(user , "user by token")
    req.validUser = user
    next()
  } catch (error) {
      console.log(error.message , "error msg")
    return res.status(400).json({success : false , error : "unauthorize"})
  }
};

module.exports = userAuth;
