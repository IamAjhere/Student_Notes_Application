const mongoose = require("mongoose");

const Noteschema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});
const Note = mongoose.model("note", Noteschema);

module.exports = Note;
