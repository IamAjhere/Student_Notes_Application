require("dotenv").config();
var Admin = require("./models/Users");
var mongoose = require("mongoose");

mongoose.connect(process.env.DB);

function addAdmin() {
  console.log("Save Admin Seed File...");
  var admin = new Admin({
    firstName: "Admin",
    lastName: "Admin",
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    status: false,
    accountType: "Admin",
  });

  Admin.find({ accountType: "Admin" }, function (err, admins) {
    if (admins.length == 0) {
      admin.save(function (err, result) {
        mongoose.disconnect();
        console.log("Admin saved successfully");
        return process.exit(1);
        if (err) {
          console.log(err);
          return process.exit(1);
        }
      });
    } else {
      console.log("Admin Exsit");
      return process.exit(1);
    }
  });
}
addAdmin();
