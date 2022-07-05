const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (email, subject, text) => {
  try {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: process.env.HOST,
      auth: {
        user: process.env.USER, // generated ethereal user
        pass: process.env.PASS, // generated ethereal password
      },
    });

    await transporter.sendMail({
      from: process.env.USER,
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
