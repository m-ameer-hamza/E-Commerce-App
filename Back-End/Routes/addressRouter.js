const express = require("express");

const addressHandlers = require("../Controllers/addressControllers");

const router = express.Router();

//creating a router for auth permission
router
  .route("/")
  .post(addressHandlers.addAddress)
  .get(addressHandlers.getAllAddresses);

module.exports = router;
