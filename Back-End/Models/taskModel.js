const mongoose = require("mongoose");

const getCurrentDateString = () => {
  const currentDate = new Date();

  return currentDate.toISOString().split("T")[0]; // Get the date part only
};

// Creating a schema for tasks
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Task is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  status: {
    type: String,
    enum: ["Complete", "In-complete"],
    default: "In-complete",
  },
  type: {
    type: String,
    enum: ["Traveling", "non-traveling"],
    default: "non-traveling",
  },
  date: {
    type: String,
    default: getCurrentDateString,
  },
});

module.exports = taskSchema;
