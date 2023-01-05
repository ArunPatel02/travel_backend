require("dotenv").config()
require("../utils/database")
const express = require("express")
const port = process.env.PORT || 8000
const userRoutes = require("../routes/data")
const cors = require("cors")
const passport = require("passport")
const googleRoutes = require("../routes/googleRoute")
const session = require('express-session');
const cookieSession = require("cookie-session")
require("../auth/googleAuth")

const app = express()

app.use(
    cookieSession({ name: "session", keys: ["arun"], maxAge: 24 * 60 * 60 * 100 })
  );

app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  }))


app.use(express.json())

app.use(session({ secret: 'SECRET' }));
app.use(passport.initialize())
app.use(passport.session())

app.use("/api" , userRoutes)
app.use("/auth" , googleRoutes)



app.listen(port , ()=>{
    console.log("app is listening at port 8000")
})