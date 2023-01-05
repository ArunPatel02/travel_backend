const hbs = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");
const path = require("path");
const { Email, Password, Service, EmailHost } = require("../config/index");
const { resolve } = require("path");
const SMTPPool = require("nodemailer/lib/smtp-pool");

var transporter = nodemailer.createTransport({
  // host: EmailHost,
  service: Service,
  // port: 587,
  // port: 465,
  // secure: true,
  auth: {
    user: Email,
    pass: Password,
  },
});

const handlebarOptions = {
  viewEngine: {
    partialsDir: path.resolve(path.join(__dirname, "../views/")),
    defaultLayout: false,
  },
  viewPath: path.resolve(path.join(__dirname, "../views/")),
};

console.log(__dirname);

transporter.use("compile", hbs(handlebarOptions));

const sendEmail = (userEmail, otp) => {
  console.log("email send started ....");

  var mailOptions = {
    from: '"no-reply"<gdsc@itmgoi.in>', // sender address
    to: userEmail, // list of receivers
    subject: "otp verification",
    template: "email", // the name of the template file i.e email.handlebars
    context: {
      otp: otp,
    },
    attachments: {
      filename: "logo-light.png",
      path: path.resolve(path.join(__dirname, "../views/logo-light.png")),
      cid: "logo",
    },
  };

  // trigger the sending of the E-mail
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error, "emailError");
        reject(error);
      } else {
        console.log("Message sent: " + info.response);
        resolve(info);
      }
    });
  });
};

module.exports = sendEmail;
