const Users = require("../Models/userModel");
const appError = require("../error");
const Products = require("../Models/productModel");

exports.addProduct = async (req, res, next) => {
  //1)- Seller ID is saved in req.user._id

  //2)- Check if req.body is empty
  if (Object.keys(req.body).length === 0) {
    return next(new appError("Please provide product details", 400));
  }

  //3)- Ensure req.user._id exists
  if (!req.user || !req.user._id) {
    return next(new appError("User not authenticated", 401));
  }

  //4)- Save the product in Product Collection with seller ID
  let product;
  try {
    product = await Products.create({
      ...req.body,
      sellerId: req.user._id,
    });
  } catch (err) {
    console.error(err.message);
    return next(new appError(err.message, 500));
  }

  //5)- Send the response
  res.status(201).json({ message: "Product Added", data: product });
};

//it uses paging to fetch the products. The number of products to return per request is 8.
//If page number greater and no product found for that page, it will return an empty array.
exports.getAllProducts = async (req, res, next) => {
  try {
    // Get the 'page' query parameter. Default to 1 if not provided.
    const page = parseInt(req.query.page) || 1;
    const limit = 8; // Number of products to return per request
    const skip = (page - 1) * limit; // Calculate the number of products to skip

    // Fetch the products with pagination
    const products = await Products.find().skip(skip).limit(limit);

    res.status(200).json({ message: "Products Fetched", data: products });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

//This function fetches the products with a discount field that is not empty.
//It returns the first 4 products with a discount.
exports.getSaleProducts = async (req, res, next) => {
  try {
    // Fetch products with non-empty discount field
    const discountedProducts = await Products.find({ discount: { $ne: "" } }) //discount is Not Equal  to "" ({$ne:"")
      .limit(4);

    res.status(200).json({
      message: "Discounted Products Fetched!!",
      data: discountedProducts,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching discounted products", error });
  }
};
exports.searchProduct = async (req, res, next) => {
  //1)- Check if productId is provided
  if (!req.params.productId) {
    return next(new appError("Please provide product ID", 400));
  }
  //2)- Find the product with the provided productId
  let product;
  try {
    product = await Products.findById(req.params.productId);
  } catch (err) {
    console.error(err.message);
    return next(new appError(err.message, 500));
  }

  //3)- Send the response
  res.status(200).json({ message: "Product Searched!!", data: product });
};
