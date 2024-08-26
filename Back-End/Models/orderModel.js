const mongoose = require("mongoose");
const User = require("./userModel");
const appError = require("../error");
const validator = require("validator");

const Schema = mongoose.Schema;

// Define the CartItem schema
const CartItemSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  discount: {
    type: String,
    default: "",
  },
  extra: {
    type: [{}],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

// Define the Address schema
const AddressSchema = new Schema({
  area: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  houseAddress: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  saveAs: {
    type: String,
    required: true,
  },
});

// Define the Order schema
const OrderSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  products: {
    type: [CartItemSchema],
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  address: {
    type: AddressSchema,
    required: true,
  },
  status: {
    type: String,
    default: "Placed",
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ["Cash on Delivery", "Credit Card"],
  },
});

module.exports = mongoose.model("Order", OrderSchema);
