const user = require("../utils/models/signup_modal");
const bcrypt = require("bcrypt");

const login = async (req, res, next) => {
  console.log("login started...");
  try {
    const result = await user.findOne({ email: req.body.email });
    if (!result) {
      return res.status(404).json({ success: false, error: "user not found"});
    }
    const validatePassword = await bcrypt.compare(
      req.body.password,
      result.password
    );
    console.log(validatePassword);
    if (!validatePassword) {
      return res
        .status(401)
        .json({ success: false, error: "Password not match" });
    }
    const token = await result.getAuthToken("15min" , next);
    res.cookie("authToken" , token)
    return res.status(200).json({ success: true, data: result , token });
  } catch (error) {
    //   console.log(error)
    return res.status(500).json({ success: false, error: "server error" });
  }
};

module.exports = login;
