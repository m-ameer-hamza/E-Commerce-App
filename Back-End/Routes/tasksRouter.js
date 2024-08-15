const express = require("express");
const taskHandlers = require("../Controllers/taskControllers");
const authHandler = require("../Controllers/authHandler");
const router = express.Router();

router
  .post("/", authHandler.verifyUserLogedIn, taskHandlers.addTask)
  .get("/today", taskHandlers.getTodaysTasks)
  .get("/", taskHandlers.getAllTasks)
  .put("/:taskId", authHandler.verifyUserLogedIn, taskHandlers.updateTask)
  .patch(
    "/:taskId",
    authHandler.verifyUserLogedIn,
    taskHandlers.updateTaskStatus
  )
  .delete("/:taskId", authHandler.verifyUserLogedIn, taskHandlers.deleteTask);

module.exports = router;
