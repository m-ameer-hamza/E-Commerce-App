const express = require("express");

const paymentHandlers = require("../Controllers/paymentController");
const router = express.Router();

router.post("/", paymentHandlers.createInstance);
//router.post("/", paymentHandlers.createInstance);

module.exports = router;
