const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = require("../config/index");

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log("accessToken" , accessToken)
      console.log("refreshToken" , refreshToken)
      console.log("profile" , profile);
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user);
  });