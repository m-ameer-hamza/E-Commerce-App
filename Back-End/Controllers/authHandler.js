const Users = require("../Models/userModel");
const appError = require("../error");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const utilities = require("../utils");
const dotenv = require("dotenv");
const { decode } = require("punycode");

//settign up the path to config file
dotenv.config({ path: "./config.env" });

//login user handler
exports.login = async (req, res, next) => {
  // 1)- Email and passowrd are present in the request

  if (!req.body.email || !req.body.password) {
    return next(new appError("Enter your password and email", 400));
  }
  // 2)- Check if email exist in DB
  const loginUser = await Users.findOne({ email: req.body.email });

  if (!loginUser) {
    return res.status(404).json({ status: "Error", message: "User not found" });
  }

  //3)- Checck the sign up method
  if (loginUser.signUpMethod != "email") {
    return res
      .status(406)
      .json({ status: "Error", message: "Wrong Login Method" });
  }

  // 3)- Check if email found in DB
  if (!loginUser) {
    return res
      .status(401)
      .json({ status: "Error", message: "Email or password not match" });
  }

  //5)- Compare the passwords

  if (!(await loginUser.matchPassword(req.body.password, loginUser.password))) {
    return res
      .status(401)
      .json({ status: "Error", message: "Email or password not match" });
  }
  //4)- Check if the user is verified or not

  if (loginUser.verified === "Not-Verified") {
    return res.status(403).json({ message: "User is not verified" });
  }

  //creating the jwt

  const token = jwt.sign(
    {
      id: loginUser._id,
      iat: Date.now(),
      exp: Date.now() + parseInt(process.env.TOKEN_DURATION),
    },
    process.env.SECREAT_KEY
  );

  res.status(200).json({
    status: "Loged In",
    message: "Successfully Logined In",
    userName: loginUser.name,
    signUpMethod: loginUser.signUpMethod,
    token,
  });
};

exports.googleLogin = async (req, res, next) => {
  // 2)- Check if email exist in DB
  const loginUser = await Users.findOne({ email: req.body.email });
  // 3)- Check if email found in DB
  if (!loginUser) {
    return res.status(404).json({ status: "Error", message: "User Not Found" });
  }
  //4)- Check the Sign UP method
  if (loginUser.signUpMethod !== "google") {
    return res.status(406).json({ message: "Wrong Login Method" });
  }

  //creating the jwt

  const token = jwt.sign(
    {
      id: loginUser._id,
      iat: Date.now(),
      exp: Date.now() + parseInt(process.env.TOKEN_DURATION),
    },
    process.env.SECREAT_KEY
  );

  res.status(200).json({
    status: "Loged In",
    message: "Successfully Logined In",
    userName: loginUser.name,
    signUpMethod: loginUser.signUpMethod,
    token,
  });
};

exports.verifyUserLogedIn = async (req, res, next) => {
  // 1)- JWT Token is there
  if (
    !req.headers.authorization ||
    !req.headers.authorization.toLowerCase().startsWith("bearer")
  ) {
    //token is not present

    return next(
      new appError("You are not Loged In. Login to gain access", 440)
    );
    //return next(new appError("token is not present", 400));
  }

  //extract the token from the header
  const token = req.headers.authorization.split(" ")[1];

  // 2)- Verify Token and it is not expired

  //check that the token is valid
  let decoded;
  try {
    decoded = await promisify(jwt.verify)(token, process.env.SECREAT_KEY);
  } catch (err) {
    console.log(err.message);
    return next(new appError(err.message, 400));
  }

  ////////////////////////////////////////////////////////////////////

  //verify that the token is not expired
  if (Date.now() > decoded.exp) {
    return next(new appError("Token is expired!!", 419));
  }

  // 3)- User still present using the id form the decoded variable
  const loginedUser = await Users.findById(decoded.id);

  //no user find
  if (!loginedUser) {
    return next(new appError("User donot exist", 401));
  }

  // 4)- user password is not updated (after jwt is issued )

  //getting the issue date and convert it to standerd date object
  const jwtIssueTime = new Date(decoded.iat);

  if (loginedUser.passwordChangeAt) {
    // console.log(loginedUser.passwordChangeAt);
    // console.log(jwtIssueTime);
    if (loginedUser.passwordChangeAt > jwtIssueTime) {
      //password is changed after jwt is created
      return next(
        new appError("Password is changed. Login again to get access!", 401)
      );
    }
  }

  //assigning the current logend in user to req. SO, that it can be used
  //in other middle-wares

  req.user = loginedUser;
  //move to next middle-ware if all ok(user is verified)
  next();
};

exports.tokenRefresh = async (req, res, next) => {
  const { usrEmail, usrPassword } = req.query;
  // console.log("Email is: ", req.body.email, "Password is: ", req.body.password);
  //1)- Check if email and password is present in req body
  if (!usrEmail || !usrPassword) {
    return next(new appError("Bad Request", 400));
  }
  //2)- Check if the user exists in the DB
  const loginUser = await Users.findOne({ email: usrEmail });
  if (!loginUser) {
    return next(new appError("User Not Found", 404));
  }

  //check if password matches
  if (!(await loginUser.matchPassword(usrPassword, loginUser.password))) {
    return next(new appError("Email or password not match", 401));
  }

  //4)-Create the JWT token
  const token = jwt.sign(
    {
      id: loginUser._id,
      iat: Date.now(),
      exp: Date.now() + parseInt(process.env.TOKEN_DURATION),
    },
    process.env.SECREAT_KEY
  );
  res.status(200).json({
    status: "Loged In",
    message: "Token Refreshed",
    userName: loginUser.name,
    token,
  });
};

exports.updatePassword = async (req, res, next) => {
  //1)- Current Password and new Password is present in Body
  if (!req.body.currPassword || !req.body.newPassword) {
    return next(new appError("Provide Current and New Password!!", 400));
  }
  //2)- Check if email is present in params
  const { usrEmail } = req.query;
  if (!usrEmail) {
    return next(new appError("Email is not present in the URL", 401));
  }

  //3)- Check if the user exists
  const loginUser = await Users.findOne({ email: usrEmail });

  if (!loginUser) {
    return next(new appError("User Not Found", 404));
  }
  //4)- Check if the current password is correct
  if (
    !(await loginUser.matchPassword(req.body.currPassword, loginUser.password))
  ) {
    return next(new appError("Invalid Password", 401));
  }

  //5)- Update the password
  loginUser.password = req.body.newPassword;
  loginUser.passwordChangeAt = Date.now();
  await loginUser.save({ validateBeforeSave: false });

  //6)- Create the JWT token
  const token = jwt.sign(
    {
      id: loginUser._id,
      iat: Date.now(),
      exp: Date.now() + parseInt(process.env.TOKEN_DURATION),
    },
    process.env.SECREAT_KEY
  );

  res.status(200).json({
    message: "Password Updated Successfully",
    token,
  });
};

exports.verifyUser = async (req, res, next) => {
  // 1)- JWT Token is there
  if (
    !req.headers.authorization ||
    !req.headers.authorization.toLowerCase().startsWith("bearer")
  ) {
    //token is not present

    return next(
      new appError("You are not Loged In. Login to gain access", 440)
    );
    //return next(new appError("token is not present", 400));
  }

  //extract the token from the header
  const token = req.headers.authorization.split(" ")[1];

  // 2)- Verify Token and it is not expired

  //check that the token is valid
  let decoded;
  try {
    decoded = await promisify(jwt.verify)(token, process.env.SECREAT_KEY);
  } catch (err) {
    console.log(err.message);
    return next(new appError(err.message, 400));
  }

  ////////////////////////////////////////////////////////////////////

  //verify that the token is not expired
  if (Date.now() > decoded.exp) {
    return next(new appError("Token is expired!!", 419));
  }

  // 3)- User still present using the id form the decoded variable
  const loginedUser = await Users.findById(decoded.id);

  //no user find
  if (!loginedUser) {
    return next(new appError("User donot exist", 401));
  }

  // 4)- user password is not updated (after jwt is issued )

  //getting the issue date and convert it to standerd date object
  const jwtIssueTime = new Date(decoded.iat);

  if (loginedUser.passwordChangeAt) {
    // console.log(loginedUser.passwordChangeAt);
    // console.log(jwtIssueTime);
    if (loginedUser.passwordChangeAt > jwtIssueTime) {
      //password is changed after jwt is created
      return next(
        new appError("Password is changed. Login again to get access!", 401)
      );
    }
  }

  res.status(200).json({ message: "User is verified" });
};

//otp verification
//This method will verify the user using the otp
exports.verifyUserOTP = async (req, res, next) => {
  //1)- Check email is present in query
  const { email } = req.query;

  if (!email) {
    return next(new appError("Provide the Email", 400));
  }

  //2)- Check id opt is present in body
  if (!req.body.otp) {
    return next(new appError("Provide the OTP", 400));
  }

  //3)- Find the user with email
  let user;

  try {
    user = await Users.findOne({ email: email });
  } catch (err) {
    return next(new appError("Could not find the user", 500));
  }

  //4)- Check if the user is found
  if (!user) {
    return next(new appError("User Not Found", 404));
  }

  //5)- Check if the opt is correct

  //convert req.body.opt to number
  const userOtp = parseInt(req.body.otp);

  if (user.optCode !== userOtp) {
    return next(new appError("Wrong OTP", 403));
  }

  //6)- Check if the opt is expired

  //convert the time to 5 hours ahead  (UTC)
  const currentTime = Date.now();

  const otpTime =
    user.optCodeTime.getTime() + 5 * 60 * 60 * 1000 + 2 * 60 * 1000; //converting the time to PK time and adding 2 minutes
  console.log("OTP time", otpTime);
  console.log("Current Time", currentTime);

  if (otpTime < currentTime) {
    return next(new appError("OTP is Expired", 400));
  }

  //7)- Update the user to verified

  user.verified = "Verified";
  user.optCode = null;
  user.optCodeTime = null;
  await user.save({ validateBeforeSave: false });

  res.status(200).json({ message: "OTP verified", data: user });
};

exports.resetPassword = async (req, res, next) => {
  //1)- Check if email is present in the query
  const { email } = req.query;
  if (!email) {
    return next(new appError("Email is not present in the URL", 400));
  }
  //2)- Check is user is present in the DB
  let user;
  try {
    user = await Users.findOne({ email: email });
  } catch (err) {
    return next(new appError("Could not find the user", 500));
  }
  //3)- Check if the user is found
  if (!user) {
    return next(new appError("User Not Found", 404));
  }
  //4)- Update the password
  user.password = req.body.password;

  await user.save({ validateBeforeSave: false });

  res.status(200).json({ message: "Password Updated Successfully" });
};

//verify that the logined User is admin
// exports.restrictTo = (...role) => {
//   return (req, res, next) => {
//     if (!role.includes(req.user.role)) {
//       //admin is not logined
//       return next(new appError("Only Admin can Access this Route", 401));
//     }

//     //admin is loged In
//     next();
//   };
// };

//Update Current Loged In user password. This will update the password of the user
// exports.updatePassword = async (req, res, next) => {
//   //check if current password is present or not

//   if (!req.body.currPassword) {
//     return next(new appError("Provide current password!", 400));
//   }

//   //check that the current pssword is correct

//   const passMatched = await req.user.matchPassword(
//     req.body.currPassword,
//     req.user.password
//   );
//   if (!passMatched) {
//     return next(
//       new appError("Invalid Password! Provide valid current password", 401)
//     );
//   }
//   //check if new Password is provided
//   if (!req.body.newPassword) {
//     return next(new appError("Provide New password!!", 400));
//   }
//   //update the password with hashing it
//   req.user.password = req.body.newPassword;
//   //adding the time for last password change
//   req.user.passwordChangeAt = Date.now();
//   try {
//     await req.user.save();
//   } catch (err) {
//     console.log(err.message);
//     return next(new appError("Password is NOT updated", 500));
//   }

//   //Lgin the user and send login token

//   const token = jwt.sign(
//     {
//       id: req.user._id,
//       iat: Date.now(),
//     },
//     process.env.SECREAT_KEY,
//     {
//       expiresIn: process.env.TOKEN_DURATION,
//     }
//   );

//   res.status(200).json({ message: "Password Modified", token });
// };
