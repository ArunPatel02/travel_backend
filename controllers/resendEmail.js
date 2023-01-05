const User = require("../utils/models/signup_modal");
const speakeasy = require("speakeasy");
const sendEmail = require("../email/sendEmail");

const resendEmail = async (req, res, next) => {
  try {
    const { _id, email } = req.validUser;
    const user = await User.findById(_id);
    // console.log(user)
    const otp = speakeasy.totp({
      secret: user.verificationToken,
      encoding: "base32",
      step: 600,
      window : 10
    });
    sendEmail(user.email, otp).then((info)=>{
      return res.status(200).json({ success: true, error: "Email sent" });
    }).catch((error)=>{
      return res.status(400).json({ success: false, error: "Unable to send email" });
    });
  } catch (error) {
    res.status(400).json({ success: false, error: "server problem" });
  }
};

module.exports = resendEmail;
