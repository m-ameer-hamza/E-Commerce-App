const Users = require("../Models/userModel");
const appError = require("../error");
//add a new Address
exports.addAddress = async (req, res, next) => {
  //1)- Check if params contains email

  if (!req.query.email) {
    return next(new appError("Please Provide an Address", 400));
  }

  //2)- Seach for the user using the email address
  let user;

  try {
    user = await Users.findOne({ email: req.query.email });
  } catch (err) {
    return next(new appError("User Does not exists", 500));
  }
  if (!user) {
    return next(new appError("User Not Found", 404));
  }

  //3. Add the address to the user
  user.Address.push(req.body.Address);
  await user.save({ validateBeforeSave: false });
  res.status(201).json({ message: "Address Added" });
};

//Get all the addresses of a user
exports.getAllAddresses = async (req, res, next) => {
  //1)- Check if params contains email
  console.log("Email", req.body);
  if (!req.query.email) {
    return next(new appError("Please Provide an Address", 400));
  }

  //2)- Seach for the user using the email address
  let user;

  try {
    user = await Users.findOne({ email: req.query.email });
  } catch (err) {
    return next(new appError("Could Not find the User", 500));
  }
  if (!user) {
    return next(new appError("User Not Found", 404));
  }

  res
    .status(200)
    .json({ message: "Fetched All Address", Address: user.Address });
};
