const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../../config");
const bcrypt = require("bcrypt");

const signUpSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationToken : {
      type : String,
      required : true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

//schema method to generate jwt token and save it to data base
signUpSchema.methods.getAuthToken = async function (expire, next) {
  console.log("generate authToken process start....");
  try {
    const token = await jwt.sign(
      {
        _id: this._id,
        email: this.email,
      },
      jwt_secret,
      {
        expiresIn: expire,
      }
    );
    this.tokens = this.tokens.concat({
      token: token,
    });
    // console.log(token);
    await this.save();
    console.log("token saved to db");
    return token;
  } catch (error) {
    return next(error);
  }
};

//hashing the password before save to db
signUpSchema.pre("save", async function (next) {
  // console.log(this);
  if (this.isModified("password")) {
    console.log("hashing started ");
    this.password = await bcrypt.hash(this.password, 10);
  }
  console.log("hashing done ");
  next();
});

module.exports = mongoose.model("user", signUpSchema);
