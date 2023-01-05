const User = require("../utils/models/signup_modal");
const speakeasy = require("speakeasy");

const verifyOtp = async (req, res, next) => {
  try {
    const { _id, email } = req.validUser;
    const user = await User.findById(_id);
    console.log(req.body);
    var tokenValidates = speakeasy.totp.verify({
      secret: user.verificationToken,
      encoding: "base32",
      token: parseInt(req.body.otp),
      step: 600,
      window : 10
    });
    if (tokenValidates) {
      const userUpdate = await User.updateOne({_id} , {verified : true})
      return res.status(200).json({ success: true, error: "Verified" , data : user});
    }
    return res.status(400).json({ success: false, error: "otp expired" });
  } catch (error) {
    res.status(400).json({ success: false, error: "server problem" });
  }
};

module.exports = verifyOtp;
