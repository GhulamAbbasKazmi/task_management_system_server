const express = require('express');
const taskController = require('../controllers/taskController');

const router = express.Router();

router.post('/', taskController.addItem); // Add a new item
router.get('/:userId', taskController.getItems); // View all items for a user
router.put('/:id', taskController.updateItem); // Update an item
router.delete('/:id', taskController.deleteItem); // Delete an item

module.exports = router;
