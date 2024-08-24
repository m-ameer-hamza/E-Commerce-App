const express = require("express");

const authHandler = require("../Controllers/authHandler");
const orderHandler = require("../Controllers/orderController");
const router = express.Router();

router.post("/", authHandler.verifyUserLogedIn, orderHandler.addOrder); //Add Order. Verify User is Loged In

module.exports = router;
