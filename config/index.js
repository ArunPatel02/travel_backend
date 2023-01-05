const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  MongodbURL,
  jwt_secret,
  Email,
  Password,
  Service,
  EmailHost,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET
} = process.env;
