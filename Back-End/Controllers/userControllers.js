const Users = require("../Models/userModel");
const appError = require("../error");
const { sendEmail } = require("../utils");

//method for filering the body.
//This method is called by updateMe Hnadler
//This Handler takes srings of fileds that are allowed to update
//and convert them to a array using spread operator

function filterBody(body, ...filerArray) {
  const newFileredArray = {};
  Object.keys(body).forEach(function (el) {
    if (filerArray.includes(el)) {
      // array contains the key
      //store the key and its value in new Array

      newFileredArray[el] = body[el];
    }
  });

  return newFileredArray;
}

//This method is called by createUser Handler
//This method checks if the user is logined with google
//If yes, then set the verified field to true
function processUserObject(user) {
  if (user.loginWith === "google") {
    return {
      ...user,
      verified: "Verified",
    };
  } else {
    return user;
  }
}

//This method will send the email to the user
async function sendEmailToUser(email) {
  console.log("Sending Email to User is called");
  //generate a random number 6 digit
  const random = Math.floor(100000 + Math.random() * 900000);
  const subject = "Email Verification";
  const text = `Your verification code is ${random}`;

  try {
    await sendEmail(email, subject, text);

    return random;
  } catch (err) {
    console.log(err.message);
    return null;
  }
}

//creating  a user
exports.createUser = async (req, res, next) => {
  if (!req.body) {
    return next(new appError("Provide the Data", 400));
  }

  //Check if the user is logined as google
  //if yes, then set the verified field to true
  //This is done because google users are already verified
  let modifiedUser = processUserObject(req.body);

  let optCode;
  //If the user is not logined with google, then send the email to the user
  if (req.body.loginWith != "google") {
    optCode = await sendEmailToUser(req.body.email);
  }

  //If the email is not send, then return the error
  if (!optCode && req.body.loginWith != "google") {
    return next(new appError("Could not send Email", 500));
  }

  //Add the optCode and time of generation with 5 mints added to current time to the user

  if (req.body.loginWith != "google") {
    modifiedUser = {
      ...modifiedUser,
      optCode: optCode,
      optCodeTime: Date.now() + 5 * 60,
    };
  }

  try {
    const user = await Users.create(modifiedUser);
    res.status(201).json({
      message: "Created",
      data: user,
    });
  } catch (err) {
    if (err.message.includes("duplicate key error collection")) {
      console.log("Email Already Exists");
      return next(new appError("User Already Exists", 409));
    }
    console.log(err.message);
    return next(new appError(err.message, 500));
  }
};

//getting all the users
exports.getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await Users.find({});
    res
      .status(200)
      .json({ message: "Success", count: allUsers.length, data: allUsers });
  } catch (err) {
    console.log(err.message);
    return next(new appError(err.message, 500));
  }
};

//update Current User
exports.updateMe = async (req, res, next) => {
  //user is logned in.
  //So, we have user saved in req.user(done in the verifyLOgedInUser Handler)

  //User try to update password
  if (req.body.password) {
    return next(
      new appError(
        "You cannot update Password on this Route. Use /updatePassword",
        400
      )
    );
  }

  //Filter out the fileds that are allowed to update by a user from body

  let fileredUpdates = filterBody(req.body, "name");

  //use findByIdAndUpdate, and not update and save because in the latter approach
  //the save method of mongoose will run and check for passwords. But we do not
  //updated the password. So, dont use this approach here
  let updatedUser;
  try {
    updatedUser = await Users.findByIdAndUpdate(req.user._id, fileredUpdates, {
      new: true, //returns the updated Document
      runValidators: true, //run all the validators
    });
  } catch (err) {
    console.log(err.message);
    return next(new appError(err.message, 400));
  }

  res
    .status(200)
    .json({ message: "User Name Modified", userName: updatedUser.name });
};

//delete Current user
exports.deleteMe = async (req, res, next) => {
  //1)- Check that the password is given(for the cofirmation)
  if (!req.body.password) {
    return next(new appError("Provide your password for confirmation", 401));
  }

  //2)- Match the password with currently Loged User
  if (!(await req.user.matchPassword(req.body.password, req.user.password))) {
    return next(
      new appError(
        "Wrong Password. Provide your password for confirmation",
        401
      )
    );
  }

  //3)- delete the user(inactive the user)
  req.user.active = false;
  req.user.save({ validateBeforeSave: false }); //save without validation
  res.status(204).json({ message: "Success", details: null });
};

//search a  logined user using email
exports.searchUser = async (req, res, next) => {
  // 1)- User is logined
  //logined Users are save in req.user
  let findUser;
  try {
    findUser = await Users.findById(req.user._id).populate("experience");
  } catch (err) {
    return next(new appError("Could Not search for user", 500));
  }

  if (!findUser) {
    res.status(404).json({ message: "Fail", data: findUser });
  }

  res.status(200).json({ message: "Found", userData: findUser });
};

exports.regenOTP = async (req, res, next) => {
  //1)- Check if email is present in the query
  const { email } = req.query;
  if (!email) {
    return next(new appError("Provide the Email", 400));
  }
  //2)- Search for user in the database

  let usr;
  try {
    usr = await Users.findOne({ email: email });
  } catch (err) {
    return next(new appError("Could Not search for user", 500));
  }

  if (!usr) {
    return next(new appError("User Not Found", 404));
  }

  //logined Users are save in req.user
  let optCode;
  try {
    optCode = await sendEmailToUser(email);
  } catch (err) {
    return next(new appError("Email Cannot be send", 407));
  }

  if (!optCode) {
    return next(new appError("OTP Cannot be send", 407));
  }

  usr.optCode = optCode;
  usr.optCodeTime = Date.now();
  usr.save({ validateBeforeSave: false }); //save without validation
  res.status(200).json({ message: "OTP send to your registered email" });
};

//delete a user
exports.deleteUser = async (req, res) => {
  try {
    await Users.deleteOne({ _id: req.params.id });
    res.status(204).json({ message: "Success" });
  } catch (err) {
    res.status(404).json({ message: "Filed", details: err });
  }
};

////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////
//address Handlers for User. THis can be place in a separate controller
