const Task = require("../models/Task");

// const createTask = async (req, res) => {
//   const { title, priority, startTime } = req.body;
//   try {
//     const task = await Task.create({ ...req.body, user: req.user.id });
//     res.status(201).json(task);
//   } catch (error) {
//     res.status(500).json({ message: "Error creating task" });
//   }
// };

// const getTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find({ user: req.user.id });
//     res.json(tasks);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching tasks" });
//   }
// };

// const updateTask = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const task = await Task.findOneAndUpdate({ _id: id, user: req.user.id }, req.body, {
//       new: true,
//     });
//     if (!task) return res.status(404).json({ message: "Task not found" });
//     res.json(task);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating task" });
//   }
// };

// const deleteTask = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const task = await Task.findOneAndDelete({ _id: id, user: req.user.id });
//     if (!task) return res.status(404).json({ message: "Task not found" });
//     res.json({ message: "Task deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting task" });
//   }
// };

const createTask = async (req, res) => {
  const { title, priority, startTime, endTime } = req.body;

  // Basic validation for required fields
  if (!title || !priority || !startTime) {
    return res.status(400).json({ message: "Title, priority, and startTime are required" });
  }

  try {
    const task = await Task.create({
      ...req.body,
      user: req.user.id,
      endTime: endTime || null, // Optional endTime
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error: error.message });
  }
};

const getTasks = async (req, res) => {
  const { status, priority, startDate, endDate } = req.query; // Accept filters

  // Building the query object based on filters
  let query = { user: req.user.id };
  if (status) query.status = status;
  if (priority) query.priority = priority;
  if (startDate || endDate) {
    query.startTime = {};
    if (startDate) query.startTime.$gte = new Date(startDate);
    if (endDate) query.startTime.$lte = new Date(endDate);
  }

  try {
    const tasks = await Task.find(query);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error: error.message });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, priority, status, endTime } = req.body;

  // Validate priority and status
  if (priority && (priority < 1 || priority > 5)) {
    return res.status(400).json({ message: "Priority must be between 1 and 5" });
  }

  if (status && !["pending", "finished"].includes(status)) {
    return res.status(400).json({ message: "Status must be 'pending' or 'finished'" });
  }

  try {
    const task = await Task.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { title, priority, status, endTime },
      { new: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found or not authorized to edit" });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error: error.message });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findOneAndDelete({ _id: id, user: req.user.id });

    if (!task) return res.status(404).json({ message: "Task not found or not authorized to delete" });

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error: error.message });
  }
};


module.exports = { createTask, getTasks, updateTask, deleteTask };
