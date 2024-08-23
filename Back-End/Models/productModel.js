const mongoose = require("mongoose");

const extraSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  values: {
    type: [String],
    required: true,
  },
});

// Define the schema for the product
const productSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  features: {
    type: [String],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: String,
    default: "",
  },
  images: {
    type: [String], // Assuming you're storing image paths as strings
    required: true,
  },
  sold: {
    type: Number,
    required: true,
  },
  extra: {
    type: [extraSchema],
    required: true,
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// Create a model using the schema
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
