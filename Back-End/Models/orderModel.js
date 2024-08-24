const mongoose = require("mongoose");

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
    type: String,
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

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;

// Middleware to add order ID to the user's order array before saving the order
//it uses transection to update the user schema
OrderSchema.pre("save", async function (next) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const User = mongoose.model("User");
    await User.findByIdAndUpdate(
      this.user,
      { $push: { order: this._id } },
      { session }
    );

    await session.commitTransaction();
    session.endSession();
    next();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(new Error("Order creation failed: Unable to update user schema."));
  }
});

module.exports = mongoose.model("Order", OrderSchema);
