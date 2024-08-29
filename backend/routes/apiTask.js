const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskController.js');


// protected routes for user
router.get('/tasks', taskController.readTask);
router.post('/tasks',taskController.writeTask);
router.delete('/tasks/:id', taskController.deleteTask);
router.patch('/tasks/:id', taskController.updateTask);
module.exports = router;