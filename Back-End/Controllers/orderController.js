const Users = require("../Models/userModel");
const Orders = require("../Models/orderModel");
const appError = require("../error");

exports.addOrder = async (req, res, next) => {
  //req.user is the user who is logged in
  try {
    //1)- Check if req contains all the fileds or not
    const { products, total, address, paymentMethod } = req.body;

    if (!products || !total || !address || !paymentMethod) {
      return next(new appError("Please provide all the required fields", 400));
    }

    //2)- Create a new order
    const newOrder = new Orders({
      user: req.user._id,
      products,
      total,
      address,
      paymentMethod,
    });

    //3)- Save the order
    // Save the order to the database
    const savedOrder = await newOrder.save();

    //4)- Save the order to the user
    // Save the order to the user

    const user = await Users.findById(req.user._id);
    console.log("User From Order Controller", user);
    console.log("Saved Order From Order Controller", savedOrder);
    if (savedOrder) {
      console.log("trying to save order to user");
      user.orders.push(savedOrder._id);
      await user.save();
    }

    res
      .status(201)
      .json({ message: "Order Created Successfully!!", savedOrder });
  } catch (err) {
    console.log(err.message);
    return next(new appError(err.message, 500));
  }
};
exports.getAllOrders = async (req, res, next) => {
  //1)- Check if email is passed in the query or not
  const email = req.query.email;
  if (!email) {
    return next(new appError("Please provide email in the query", 400));
  }

  //2)- Search for the user using the email
  const user = await Users.findOne({ email });
  if (!user) {
    return next(new appError("User not found", 404));
  }

  //3)- Fetch all the orders of the user

  let UsrOrders = [];
  const orderSize = user.orders.length;
  for (let i = 0; i < orderSize; i++) {
    const order = await Orders.findById(user.orders[i]);
    UsrOrders.push(order);
  }

  res
    .status(200)
    .json({ message: "Orders Fetched", orderSize, data: UsrOrders });
};
exports.searchOrder = async (req, res, next) => {};
exports.updateOrderStatus = async (req, res, next) => {};
exports.updateOrderStatusAutomatic = async (req, res, next) => {};
exports.deleteOrder = async (req, res, next) => {};
