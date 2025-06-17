const TaskService = require("./tasks.service");

//create new Task controller
const createTaskController = async (req, res) => {
  try {
    const payload = req.body;

    const response = await TaskService.CreateTask({
      title: payload.title,
      userId: req.user._id,
    });

    if (response) {
      return res.status(201).json({
        message: "Task created successfully",
        data: response,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

//list all tasks for a particular users plus sort them using title or status
const getTasksController = async (req, res) => {
  try {
    const { title, status } = req.query;
    const userId = req.user._id;

    const response = await TaskService.GetAllTasks({
      title,
      status,
      userId,
    });

    return res.status(200).json({
      message: "Tasks retrieved successfully",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

//update controller function
const updateTaskController = async (req, res) => {
  try {
    const { title } = req.query;
    const { status } = req.body;

    const response = await TaskService.UpdateTask({
      title,
      status,
    });

    return res.status(200).json({
      message: "Task updated successfully",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  createTaskController,
  getTasksController,
  updateTaskController,
};
