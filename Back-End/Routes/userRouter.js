const express = require("express");

const userHandlers = require("../Controllers/userControllers");
const authHandler = require("../Controllers/authHandler");
const router = express.Router();

//creating a router for auth permission
router

  .post(
    "/signup",

    userHandlers.createUser
  )

  .post("/login", authHandler.login)
  .post("/googleLogin", authHandler.googleLogin)
  .get("/refreshToken", authHandler.tokenRefresh)
  .get("/verifyUser", authHandler.verifyUser)
  .get("/regenerateOTP", userHandlers.regenOTP)
  .patch(
    "/updateUserName",
    authHandler.verifyUserLogedIn,
    userHandlers.updateMe
  )
  .patch("/verifyOTP", authHandler.verifyUserOTP)
  .post("/forgetPassword", authHandler.forgetPassword)
  .patch("/resetPassword", authHandler.resetPassword)
  .patch("/updatePassword", authHandler.updatePassword);

module.exports = router;
