const Users = require("../Models/userModel");
const Orders = require("../Models/orderModel");
const appError = require("../error");

exports.addOrder = async (req, res, next) => {
  //req.user is the user who is logged in
  //1)- Check if req contains all the fileds or not
  const { products, total, address, paymentMethod } = req.body;
  console.log("Products from  useOrderApi", products);
  console.log("Total from  useOrderApi", total);
  console.log("PaymentMethod from  useOrderApi", paymentMethod);
  console.log("Address from  useOrderApi", typeof address);

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

  res.status(201).json({ message: "Order Created Successfully!!", savedOrder });
};
exports.getAllOrders = async (req, res, next) => {};
exports.searchOrder = async (req, res, next) => {};
exports.updateOrderStatus = async (req, res, next) => {};
exports.updateOrderStatusAutomatic = async (req, res, next) => {};
exports.deleteOrder = async (req, res, next) => {};
