const user = require("../utils/models/signup_modal");
const speakeasy = require("speakeasy");
const sendEmail = require("../email/sendEmail");

const signUp = async (req, res, next) => {
  console.log("starting signUp....");
  try {
    const findUser = await user.findOne({ email: req.body.email });
    if (findUser) {
      return res
        .status(400)
        .json({ success: false, error: "user Already exists" });
    }
    const verificationToken = speakeasy.generateSecret();
    const newUser = new user({
      ...req.body,
      verificationToken: verificationToken.base32,
    });
    const token = await newUser.getAuthToken("15min", next);
    const result = await newUser.save();
    const otp = speakeasy.totp({
      secret: verificationToken.base32,
      encoding: "base32",
      step: 600,
      window : 10,
    });
    sendEmail(req.body.email, otp).then((info)=>{
      return res.status(200).json({ success: true, data: result, token, otp });
    }).catch((error)=>{
      res.status(400).json({ success: false, error: "unable to send email" });
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error: "server error" });
  }
};

module.exports = signUp;
