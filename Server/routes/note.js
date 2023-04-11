const router = require("express").Router();
const verify = require("./auth");
const mongoose = require("mongoose");

const Notes = require("../models/Notes");
const User = require("../models/Users");

//load all notes
router.get("/note/read", verify, (req, res) => {
  //only for students
  const student = req.user.accountType === "Student";
  if (!student) return res.send("Only students can read");
  const id = req.user._id;
  Notes.find({ user: id }, function (err, note) {
    if (err) {
      console.log(err);
    } else {
      res.json(note);
    }
  });
});

//create note
router.post("/note/create", verify, async (req, res) => {
  const id = mongoose.Types.ObjectId(req.user._id);
  const title = req.body.title;
  const notes = req.body.text;
  //create a new note
  const note = new Notes({
    title: title,
    text: notes,
    user: id,
  });
  try {
    const savedNote = await note.save();
    res.send(savedNote);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//find note for each id of note
router.get("/note/:id", verify, (req, res) => {
  const id = req.params.id;
  Notes.findById(id, (err, notes) => {
    if (err) {
      console.log(err);
    }
    res.json(notes);
  });
});

//update notes
router.post("/note/:id", verify, (req, res) => {
  const id = req.params.id;
  Notes.findById(id, (err, notes) => {
    if (!notes) {
      res.status(404).send("Note not found");
    } else {
      notes.text = req.body.text;

      notes
        .save()
        .then((notes) => {
          res.json(notes);
        })
        .catch((err) => {
          res.status(500).send(err.message);
        });
    }
  });
});

//delete note
router.get("/note/delete/:id", verify, (req, res) => {
  const id = req.params.id;
  Notes.deleteOne({ _id: id }, (err, notes) => {
    if (err) {
      res.status(500).send(err.message);
    }
    res.json(notes);
  });
});

module.exports = router;
