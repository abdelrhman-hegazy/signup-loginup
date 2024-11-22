const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");

const app = express();

//convert data into json format
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(express.static("puplic/style.css"))
//use ejs as the view engine
app.set("view engin", "ejs");

app.get("/", (req, res) => {
  res.render("login.ejs");
});
app.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.username,
    password: req.body.password,
  };
  //check user already
  const findUser = await collection.findOne({ name: data.name });
  if (findUser) {
    res.send("this already user");
  } else {
    // hash password
    salatRound = 10;
    const hashPassword = await bcrypt.hash(data.password, salatRound);
    data.password = hashPassword;
    const userData = await collection.insertMany(data);
    res.send("Home Page");
  }
});
// login
app.post("/login", async (req, res) => {
    const check = await collection.findOne({ name: req.body.username });
    if (!check) {
      res.send("Not Found");
    }

    //compare hash password from database the plain text
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      check.password
    );
    if (isPasswordMatch) {
      res.render("home.ejs");
    } else {
      req.send("Not found");
    }
});
const Port = 5000;
app.listen(Port, () => {
  console.log(`Server Running On Port: ${Port}`);
});
