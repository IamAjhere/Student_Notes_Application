const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (email, subject, text) => {
  try {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.elasticemail.com",
      auth: {
        user: "ajcreationsajmal@gmail.com", // generated ethereal user
        pass: "29F33057BD0BDA29B093A52870DCD85C5796", // generated ethereal password
      },
    });

    await transporter.sendMail({
      from: "ajcreationsajmal@gmail.com",
      to: email,
      subject: subject,
      text: text,
    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};

module.exports = sendEmail;
