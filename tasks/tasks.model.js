const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  status: {
    type: String,
    enum: ["pending", "completed", "deleted"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
