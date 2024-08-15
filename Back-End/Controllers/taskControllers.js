const Users = require("../Models/userModel");
const appError = require("../error");

//finding the user document
async function findUserDocument(key, value) {
  let doc;

  //creating a query object
  let query = {};
  query[key] = value;
  // console.log(query);

  //now passing the query object in the findOne methode
  try {
    doc = await Users.findOne(query);
  } catch (err) {
    return next(new appError(err.message, 500));
  }

  return doc;
}

exports.addTask = async (req, res, next) => {
  //logined User is saved in req.user

  let user;
  try {
    // Check if the title already exists in the task array
    const titleExists = await Users.findOne({
      _id: req.user._id,
      "task.title": req.body.title,
    });

    if (titleExists) {
      return next(new appError("Task Already exists", 400));
    }

    //Task not found
    user = await Users.findByIdAndUpdate(
      req.user._id,
      {
        $push: { tasks: req.body },
      },
      {
        new: true, // to return the modified document
        runValidators: true, // to run validators on update
      }
    );
  } catch (err) {
    console.error(err.message);
    return next(new appError(err.message, 500));
  }

  res.status(201).json({ message: "Task Added!!", user });
};







exports.getAllTasks = async (req, res, next) => {
  // Get the email from the request body or query
  const email = req.body.email || req.query.email;

  console.log(email);
  if (!email) {
    return next(new appError("Please Provide Email", 400));
  }

  // Find the user's document by email
  let document = await findUserDocument("email", email);

  if (!document) {
    return next(new appError("No User Found", 404));
  }

  // Get the current date and set time to 00:00:00
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  // Filter tasks to return only those with dates in the past
  const pastTasks = document.tasks.filter(task => {
    const taskDate = new Date(task.date);
    taskDate.setHours(0, 0, 0, 0); // Set time to 00:00:00

    return taskDate < currentDate;
  });

  // Send response with filtered tasks
  res.status(200).json({ message: "Success", allTaskLists: pastTasks });
};



//get todays tasks
exports.getTodaysTasks = async (req, res, next) => {
  const email = req.body.email || req.query.email;

  if (!email) {
    return next(new appError("Please Provide Email", 400));
  }

  let document = await findUserDocument("email", email);

  if (!document) {
    return next(new appError("No User Found", 404));
  }

  const allTasks = document.tasks;

 

  // Get today's date in the format "YYYY-MM-DD"
  const today = new Date().toISOString().split("T")[0];

  // Filter tasks to include only those with today's date
  const todaysTasks = allTasks.filter((task) => task.date === today);

 

  res.status(200).json({ message: "Success", allTaskLists: todaysTasks });
};

//update the status of a task
exports.updateTaskStatus = async (req, res, next) => {
  //logined User is saved in req.user
  const { taskId } = req.params;
  const { status } = req.body;

  // console.log("Task ID", taskId, "Task Status", status);

  if (!taskId || !status) {
    return next(new appError("Please Provide TaskId and Status", 400));
  }

  let user;
  try {
    user = await Users.findOneAndUpdate(
      {
        _id: req.user._id,
        "tasks._id": taskId,
      },
      {
        $set: {
          "tasks.$.status": status,
        },
      },
      {
        new: true, // to return the modified document
        runValidators: true, // to run validators on update
      }
    );
  } catch (err) {
    console.error(err.message);
    return next(new appError(err.message, 500));
  }

  res.status(200).json({ message: "Task Status Updated!!", user });
};

//update the task
exports.updateTask = async (req, res, next) => {
  //logined User is saved in req.user
  const { taskId } = req.params;

  if (!taskId || !req.body) {
    return next(
      new appError("Please Provide TaskId and details to update", 400)
    );
  }

  let user;
  try {
    user = await Users.findOneAndUpdate(
      {
        _id: req.user._id,
        "tasks._id": taskId,
      },
      {
        $set: {
          "tasks.$": req.body,
        },
      },
      {
        new: true, // to return the modified document
        runValidators: true, // to run validators on update
      }
    );
  } catch (err) {
    console.error(err.message);
    return next(new appError(err.message, 500));
  }

  res.status(200).json({ message: "Task Updated!!" });
};

//delete the task

exports.deleteTask = async (req, res, next) => {
  //logined User is saved in req.user
  const { taskId } = req.params;

  if (!taskId) {
    return next(new appError("Please Provide TaskId to delete", 400));
  }

  let user;
  try {
    user = await Users.findOneAndUpdate(
      {
        _id: req.user._id,
      },
      {
        $pull: {
          tasks: { _id: taskId },
        },
      },
      {
        new: true, // to return the modified document
        runValidators: true, // to run validators on update
      }
    );
  } catch (err) {
    console.error(err.message);
    return next(new appError(err.message, 500));
  }

  res.status(204).json({ message: "Task Deleted!!" });
};
