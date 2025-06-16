const Task = require("./tasks.model");

//create task function
const CreateTask = async ({ title }) => {
  const createTask = await Task.create({ title });
  return createTask;
};

//get all task function
const GetAllTasks = async ({ title, status }) => {
  const query = {};

  if (title) {
    query.title = title;
  }
  if (status) {
    query.status = status;
  }

  const Tasks = await Task.find(query);
  return Tasks;
};

//update task status
const UpdateTask = async ({ title, status }) => {
  //check if status is valid
  const validStatuses = ["pending", "completed", "deleted"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  const query = {};

  if (title) {
    query.title = title;
  }

  //finding the task for update
  const task = await Task.findOne(query);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.status = status;
  return await task.save();

  return res.status(200).json({ message: "Task updated successfully", task });
};

module.exports = {
  CreateTask,
  GetAllTasks,
  UpdateTask,
};
