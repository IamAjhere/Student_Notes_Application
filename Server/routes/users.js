const jwt = require("jsonwebtoken");
const router = require("express").Router();
const {
  registerValidation,
  loginValidation,
  newStudentValidation,
} = require("../validation");
const bcrypt = require("bcryptjs");
const sendEmail = require("../nodemailer");
const verify = require("./auth");

const User = require("../models/Users");

//Add Users To Database
router.post("/register", verify, async (req, res) => {
  //only for admin users
  const admin = req.user.accountType === "Admin";
  if (!admin) return res.status(403).send("Only admin users can register");
  //validation
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if the user is already registered
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  // hash the email as temporary password
  const salt = await bcrypt.genSalt(0);
  const hashPasswords = await bcrypt.hash(req.body.email, salt);
  const TempPassword = hashPasswords.toString().slice(-15).replaceAll(".", "");
  //create a new User
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: TempPassword,
    status: req.body.status,
    accountType: req.body.accountType,
  });
  //try to send email to the registered student
  try {
    const savedUser = await user.save();
    //send email with temporary password to the user
    sendEmail(
      req.body.email,
      "Created New Account",
      "Your Login Credentials are: \n" +
        "     Email: " +
        savedUser.email +
        "\n" +
        "     Temporary password- " +
        TempPassword
    );
    res.status(200).send("New Student Account is created successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//login users
router.post("/login", async (req, res) => {
  //validation
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if the email is valid
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email is invalid");

  if (!user.status) {
    //Temprorary password is valid
    const validpass = user.password == req.body.password;
    if (!validpass) return res.status(400).send(" Password is invalid");
  } else {
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(400).send("Invalid Password");
  }

  //create and assign a token
  const token = jwt.sign(
    { _id: user._id, accountType: user.accountType },
    process.env.TOKEN_SECRET
  );
  res.header("auth-token", token);
  res.json({
    Access_Token: token,
    accountType: [user.accountType],
  });
});

//update the new student
router.post("/newstudent", verify, async (req, res) => {
  //only new students can do this
  const newstudent = req.user.accountType === "NewStudent";
  if (!newstudent)
    return res.status(403).send("Only New Student users can update details");
  //validation
  const { error } = newStudentValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //hash the password
  const salt = await bcrypt.genSalt(10);
  const hashPasswords = await bcrypt.hash(req.body.password, salt);
  //get the new students info
  const id = req.user._id;
  const contents = {
    status: req.body.status,
    accountType: req.body.accountType,
    password: hashPasswords,
    dateOfBirth: req.body.dateOfBirth,
    mobile: req.body.mobile,
  };

  User.findByIdAndUpdate(id, contents, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

//all users
router.get("/read", verify, (req, res) => {
  //only for admin
  const student = req.user.accountType === "Admin";
  if (!student) return res.send("Only Admin can read");
  User.find(
    { $or: [{ accountType: "Student" }, { accountType: "NewStudent" }] },
    function (err, users) {
      res.json(users);
    }
  );
});

module.exports = router;
