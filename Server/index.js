require("dotenv").config();
require("./db/mongodb.js");

const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

//middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [process.env.BASE_URL],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

//import Routes
const authRoutes = require("./routes/auth");
const users = require("./routes/users");
const notes = require("./routes/note");

//Routes Middlewares
app.use("/api", users, notes);

const port = process.env.PORT;
app.listen(port, () => console.log("server started nn port", { port }));
