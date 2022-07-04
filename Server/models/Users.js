const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: String,
  dateOfBirth: Date,
  mobile: Number,
  status: Boolean,
  accountType: String,
});

const User = mongoose.model("user", userSchema);

module.exports = User;
