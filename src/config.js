const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost/login-tut");

connect
  .then(() => {
    console.log("DBs connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

// create schema
const loginschema = new mongoose.Schema({
  name : {
    type: String,
    required: true
  },
  password : {
    type: String,
    required: true
  }
})

const collection = new mongoose.model("users", loginschema);
module.exports = collection