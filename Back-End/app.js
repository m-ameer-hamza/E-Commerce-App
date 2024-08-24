const express = require("express");
const morgan = require("morgan");
const appError = require("./error");
const path = require("path");
const cors = require("cors");
const globalerrorHandler = require("./Controllers/globalErrorHandler");

const userRouter = require("./Routes/userRouter");
const orderRouter = require("./Routes/orderRouter");
const addressRouter = require("./Routes/addressRouter");
const paymentRouter = require("./Routes/paymentRouter");
const productRouter = require("./Routes/productRouter");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));

//path to serve the static files
app.use(express.static(path.join(__dirname, "public")));

//adding user routers as a middle-ware
app.use("/e-commerce/users", userRouter);

//adding the address router as a middle-ware
app.use("/e-commerce/address", addressRouter);

//adding the payment router as a middle-ware
app.use("/e-commerce/payment", paymentRouter);

//adding the product router as a middle-ware
app.use("/e-commerce/products", productRouter);

//adding the order router as a middle-ware
app.use("/e-commerce/orders", orderRouter);

//handling error for undefined handler
app.use("*", (req, res, next) => {
  next(new appError(`Cannot find request for URL ${req.originalUrl}`, 400));
});

//error handling middle-warew
//This middle-ware is automatically called when an error occured
app.use(globalerrorHandler);

module.exports = app;
