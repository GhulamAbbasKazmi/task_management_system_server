// models/TaskItem.js

const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // UUID for generating unique IDs

const taskItemSchema = new mongoose.Schema(
  {
    item_id: {
      type: String,
      unique: true, // Ensure uniqueness of item_id
      default: uuidv4, // Generate unique UUID if item_id is not provided
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'in-progress', 'completed'], // Example statuses
      default: 'pending',
    },
    dueDate: {
      type: Date,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the User model
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure a unique index on item_id
taskItemSchema.index({ item_id: 1 }, { unique: true });

const TaskItemModel = mongoose.model('TaskItem', taskItemSchema);

module.exports = TaskItemModel;
