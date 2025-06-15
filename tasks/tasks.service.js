const Task = require("./tasks.model");

//create task function
const CreateTask = async ({ title, userId }) => {
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

module.exports = {
  CreateTask,
  GetAllTasks,
};
