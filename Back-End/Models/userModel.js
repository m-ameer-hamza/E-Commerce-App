const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const appError = require("../error");
const validator = require("validator");
const Tasks = require("./taskModel");
//creating a schema for users
const userSchema = new mongoose.Schema({
  name: { required: [true, "Name is required"], type: String },
  email: {
    validate: [validator.isEmail, "Enter a valid email"],
    required: [true, "Email is required"],
    unique: [true, "Email taken"],
    type: String,
  },
  password: {
    minlength: [8, "Min-length of password is 8"],
    required: [true, "password is required"],
    type: String,
  },
  userType: {
    type: String,
    enum: ["buyer", "seller"],
    required: [true, "User Type is required"],
  },
  signUpMethod: {
    type: String,
    enum: ["email", "google"],
    required: [true, "Sign Up With is required"],
    default: "email",
  },
  verified: {
    type: String,
    enum: ["Verified", "Not-Verified"],
    default: "Not-Verified",
  },
  tasks: [Tasks],
  Address: [], //array of addresses

  passwordChangeAt: Date,
  passwordRestToken: String,
  passwordRestDuration: Date,
});

//bycrupt the password
userSchema.pre("save", async function (next) {
  //password is going to update

  //check if password is modified or not
  if (!this.isModified("password")) {
    return next();
  }
  //passowrd is modified
  try {
    this.password = await bcrypt.hash(this.password, 12);
  } catch (err) {
    console.log(err.message);
    next(new appError("Password is not Hashed", 500));
  }
});

//instant method for checking the password
userSchema.methods.matchPassword = async (userPassword, dbPassword) => {
  return await bcrypt.compare(userPassword, dbPassword);
};

//This method will create a random OTP of 5 digits.
//Encrypt the OTP and save it is DB. Also save the time on which the
//OTP was issued.
userSchema.methods.createOTP = async function () {
  //generating a five digit number and convert it to string
  let OTP = Math.floor(1000000 + Math.random() * 9000000).toString();

  //crypting the OTP to save in Db
  this.passwordRestToken = await bcrypt.hash(OTP, 12);

  //console.log(this.passwordRestToken);
  //restting up the time for OTP
  this.passwordRestDuration = Date.now() + 10 * 60 * 1000;

  //saving the changes to DB

  return OTP;
};

//creating a model using the schema
const Users = mongoose.model("Users", userSchema);

//exporting the users to perform CRUD in controller
module.exports = Users;
