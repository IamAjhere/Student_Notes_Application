require("dotenv").config();
var Admin = require("./models/Users");
var mongoose = require("mongoose");

mongoose.connect(process.env.DB);

var admin = new Admin({
  firstName: "Admin",
  lastName: "Admin",
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
  status: false,
  accountType: "Admin",
});

admin.save(function (err, result) {
  mongoose.disconnect();
  console.log("Admin saved successfully");
  if (err) console.log(err);
});
