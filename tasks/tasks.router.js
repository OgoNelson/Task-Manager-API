const express = require("express");

const router = express.Router();

const tasksController = require("./tasks.controller");
const tasksMiddleware = require("./tasks.middleware");
const userMiddleware = require("../users/users.middleware");

router.use(userMiddleware.AuthorizeUser);

// create task route
router.post(
  "/",
  tasksMiddleware.CreateTaskValidator,
  tasksController.createTaskController
);

//get tasks route
router.get("/", tasksController.getTasksController);

//update task route
router.put("/", tasksController.updateTaskController);

module.exports = router;
