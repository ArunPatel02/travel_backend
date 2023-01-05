const express = require("express");
const userAuth = require("../auth/userAuth");
const route = express.Router();
const speakeasy = require("speakeasy");
const controllers = require("../controllers/index")
const userModal = require("../utils/models/signup_modal")

//sign up route end point
route.post("/signup", controllers.signUp);

//login route eng point
route.post("/login", controllers.login);

//resend otp end point
route.get("/resend/otp",userAuth , controllers.resendEmail)

//verify otp end point
route.post("/verify/otp" , userAuth , controllers.verifyOtp)

//get user by token and return user details
route.get("/validUser" , userAuth , async(req , res)=>{
    try {
        if (req.validUser) {
            const result = await userModal.findOne({_id : req.validUser._id})
            // console.log(result)
            return res.status(200).json({success : true , data : result})
        }
        return res.status(400).json({success : false , error : "token in invalid"})
    } catch (error) {
        return res.status(400).json({success : false , error : "server error"})
    }
})



// route.get("/", async (req, res) => {
//   const token = speakeasy.totp({
//     secret: "F5NF43ZFPJUUGNKJH5WVQNZXNAST44RGHIXWYZRMOQ2TQTKJFZRQ",
//     encoding: "base32",
//     step: 600,
//   });
//   var remainingTime = 600 - Math.floor((new Date().getTime() / 1000) % 600);
//   res.send({ token, remainingTime });
// });

// route.get("/verify/:id", (req, res) => {
//   var tokenValidates = speakeasy.totp.verify({
//     secret: "F5NF43ZFPJUUGNKJH5WVQNZXNAST44RGHIXWYZRMOQ2TQTKJFZRQ",
//     encoding: "base32",
//     token: req.params.id,
//     window : 0,
//     step : 600
//   });
//   console.log(tokenValidates);
//   res.send(tokenValidates);
// });

module.exports = route;
