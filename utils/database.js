const mongoose = require("mongoose");
const { MongodbURL } = require("../config");

// console.log(MongodbURL)

//Connections Setup
mongoose
  .connect(MongodbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db is connected");
    // commonData()
  })
  .catch((err) => console.log("db is not connected", err));
