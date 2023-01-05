const passport = require("passport")
const route = require("express").Router()

const CLIENT_URL = "http://localhost:3000/";

route.get("/login/success", (req, res) => {
    console.log(req.user)
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
    });
  }
});

route.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

route.get("/google", passport.authenticate("google", { scope: ["profile"] }));

route.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = route