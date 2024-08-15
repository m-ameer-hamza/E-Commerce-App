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
  .patch(
    "/updateUserName",
    authHandler.verifyUserLogedIn,
    userHandlers.updateMe
  )
  .post("/forgetPassword", authHandler.forgetPassword)
  .patch("/resetPassword", authHandler.resetPassword)
  .patch(
    "/updatePassword",
    authHandler.verifyUserLogedIn,
    authHandler.updatePassword
  );

module.exports = router;
