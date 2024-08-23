const express = require("express");

const authHandler = require("../Controllers/authHandler");
const productHandler = require("../Controllers/productControllers");
const router = express.Router();

router
  .post("/", authHandler.verifyUserLogedIn, productHandler.addProduct)
  .get("/", productHandler.getAllProducts)
  .get("/sale", productHandler.getSaleProducts)
  .get("/:productId", productHandler.searchProduct);

module.exports = router;
