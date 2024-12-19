const TaskItemModel = require("../models/TaskItem");

// Add a new task item
exports.addItem = (req, res) => {
  const { title, description, status, dueDate, userId } = req.body;

  // Check for missing required fields
  if (!title || !description || !status || !dueDate || !userId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  TaskItemModel.create({
    title,
    description,
    status,
    dueDate,
    user: userId, // Reference to the user
  })
    .then((result) => res.status(201).json(result)) // 201 for resource creation
    .catch((err) =>
      res.status(500).json({ error: "An error occurred", message: err.message })
    );
};

// Get all task items for a specific user
exports.getItems = (req, res) => {
  const { userId } = req.params;

  // Check for missing userId
  if (!userId) {
    return res.status(400).json({ message: "Missing userId parameter" });
  }

  TaskItemModel.find({ user: userId })
    .then((result) => res.json(result))
    .catch((err) =>
      res.status(500).json({ error: "An error occurred", message: err.message })
    );
};

// Update a task item
exports.updateItem = (req, res) => {
  const { id } = req.params; // The task ID in the database
  const { title, description, status, dueDate, userId } = req.body;

  // Check for missing id or userId
  if (!id) {
    return res
      .status(400)
      .json({ message: "Missing task id in the request params" });
  }
  if (!userId) {
    return res
      .status(400)
      .json({ message: "Missing userId in the request body" });
  }

  // Check for at least one field to update
  if (!title && !description && !status && !dueDate) {
    return res.status(400).json({ message: "No fields to update" });
  }

  TaskItemModel.findOneAndUpdate(
    { _id: id, user: userId }, // Match task by ID and user
    { title, description, status, dueDate }, // Fields to update
    { new: true } // Return the updated document
  )
    .then((result) => {
      if (!result) return res.status(404).json({ message: "Task not found" });
      res.json(result);
    })
    .catch((err) =>
      res.status(500).json({ error: "An error occurred", message: err.message })
    );
};

// Delete a task item
exports.deleteItem = (req, res) => {
  const { id } = req.params; // The task ID in the database
  const { userId } = req.body;

  // Check for missing id or userId
  if (!id) {
    return res
      .status(400)
      .json({ message: "Missing task id in the request params" });
  }
  if (!userId) {
    return res
      .status(400)
      .json({ message: "Missing userId in the request body" });
  }

  TaskItemModel.findOneAndDelete({ _id: id, user: userId }) // Match task by ID and user
    .then((result) => {
      if (!result) return res.status(404).json({ message: "Task not found" });
      res.json({ message: "Task deleted successfully" });
    })
    .catch((err) =>
      res.status(500).json({ error: "An error occurred", message: err.message })
    );
};
