const express = require("express");
const morgan = require("morgan");
const appError = require("./error");
const globalerrorHandler = require("./Controllers/globalErrorHandler");

const userRouter = require("./Routes/userRouter");
const taskRouter = require("./Routes/tasksRouter");
const addressRouter = require("./Routes/addressRouter");
const paymentRouter = require("./Routes/paymentRouter");
const productRouter = require("./Routes/productRouter");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

//adding user routers as a middle-ware
app.use("/e-commerce/users", userRouter);

//adding the address router as a middle-ware
app.use("/e-commerce/address", addressRouter);

//adding the payment router as a middle-ware
app.use("/e-commerce/payment", paymentRouter);

//adding the product router as a middle-ware
app.use("/e-commerce/products", productRouter);

//adding the task router as a middle-ware
app.use("/portfolio/v1/tasks", taskRouter);

//handling error for undefined handler
app.use("*", (req, res, next) => {
  next(new appError(`Cannot find request for URL ${req.originalUrl}`, 400));
});

//error handling middle-warew
//This middle-ware is automatically called when an error occured
app.use(globalerrorHandler);

module.exports = app;
