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

  //passwords are matched

  //creating the jwt

  const token = jwt.sign(
    {
      id: loginUser._id,
      iat: Date.now(),
      exp: Date.now() + parseInt(process.env.TOKEN_DURATION),
    },
    process.env.SECREAT_KEY
  );

  let decode = jwt.decode(token, { complete: true });

  res.status(200).json({
    status: "Loged In",
    message: "Successfully Logined In",
    userName: loginUser.name,
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

//verify that the logined User is admin
exports.restrictTo = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      //admin is not logined
      return next(new appError("Only Admin can Access this Route", 401));
    }

    //admin is loged In
    next();
  };
};

//forgetPassword Handler. This will generate  the OTP and send it to the user
exports.forgetPassword = async (req, res, next) => {
  if (!req.body.email) {
    return next(new appError("Provide your Email!!", 400));
  }

  // 1)- Chck that the meil is present

  const forgetUser = await Users.findOne({ email: req.body.email });
  //Donot find the email

  if (!forgetUser) {
    return next(new appError("User Not found!!", 404));
  }
  // 2)- Generate a passwordResetToken(using the mongoose instant methods)

  const resetOTP = await forgetUser.createOTP();

  //waiting for saving the changes in the DB
  //We are passing the option validateBeforeSave:false , not to validate the inputs according to schema
  //when adding the changes in the already present document
  await forgetUser.save({ validateBeforeSave: false });

  //3)- Sending the OTP using the nodemailer
  const mailSent = await utilities.ResetMailHandler(resetOTP);

  if (!mailSent) {
    return next(new appError("Password Reset Mail not send", 500));
  }
  res.status(200).json({ message: "Success", details: "OTP send on Email!!" });
};

//Reset Password Handler. This will reset the password of the user
exports.resetPassword = async (req, res, next) => {
  // 1)- Req contains the OTP and new Password
  if (!req.body.otp || !req.body.newPassword) {
    return next(new appError("Provide the OTP and new Password!!", 400));
  }
  //check if email is present in the URL or not
  if (!req.query.email) {
    return next(new appError("Email is not present in the URL", 401));
  }
  // 2)-Check that the user exists

  const newPasswordUser = await Users.findOne({ email: req.query.email });

  //console.log(newPasswordUser);
  if (!newPasswordUser) {
    return next(new appError("User Not Found", 401));
  }
  // 3)-Verify that OTP matches with saved one and time is not expired

  //check if the time is expired or NOT
  if (newPasswordUser.passwordRestDuration < Date.now()) {
    //clear the OTP field and duration from DB if OTP is expired
    newPasswordUser.passwordRestToken = undefined;
    newPasswordUser.passwordRestDuration = undefined;

    //saving the changes in DB
    newPasswordUser.save({ validateBeforeSave: false });
    return next(new appError("OTP expired!", 401));
  }

  //verify that OTP exists
  if (!newPasswordUser.passwordRestToken) {
    return next(
      new appError("OTP is not generated. Go to Forget password!!", 400)
    );
  }
  //check if the otp matches wiht the

  if (
    !(await newPasswordUser.matchPassword(
      req.body.otp,
      newPasswordUser.passwordRestToken
    ))
  ) {
    return next(new appError("Invalid OTP", 401));
  }

  // 5)- Update the password, set the passwordChangeAt and send the JWT token

  //updating the password.
  // This will run the pre method of mongoose schema before updating
  //the password. This method will hash the new password
  newPasswordUser.password = req.body.newPassword;

  //setting up the date on which password is changed
  newPasswordUser.passwordChangeAt = Date.now();
  //prevent from schema validation
  newPasswordUser.save({ validateBeforeSave: false });

  //genrating the token
  const token = jwt.sign({ id: newPasswordUser._id }, process.env.SECREAT_KEY, {
    expiresIn: process.env.TOKEN_DURATION,
  });

  //clear the OTP and expiry time
  newPasswordUser.passwordRestDuration = undefined;
  newPasswordUser.passwordRestToken = undefined;
  res.status(200).json({
    message: "Passowrd Changed. Your are Login with new password!!",
    token,
  });
};

//Update Current Loged In user password. This will update the password of the user
exports.updatePassword = async (req, res, next) => {
  //check if current password is present or not

  if (!req.body.currPassword) {
    return next(new appError("Provide current password!", 400));
  }

  //check that the current pssword is correct

  const passMatched = await req.user.matchPassword(
    req.body.currPassword,
    req.user.password
  );
  if (!passMatched) {
    return next(
      new appError("Invalid Password! Provide valid current password", 401)
    );
  }
  //check if new Password is provided
  if (!req.body.newPassword) {
    return next(new appError("Provide New password!!", 400));
  }
  //update the password with hashing it
  req.user.password = req.body.newPassword;
  //adding the time for last password change
  req.user.passwordChangeAt = Date.now();
  try {
    await req.user.save();
  } catch (err) {
    console.log(err.message);
    return next(new appError("Password is NOT updated", 500));
  }

  //Lgin the user and send login token

  const token = jwt.sign(
    {
      id: req.user._id,
      iat: Date.now(),
    },
    process.env.SECREAT_KEY,
    {
      expiresIn: process.env.TOKEN_DURATION,
    }
  );

  res.status(200).json({ message: "Password Modified", token });
};
