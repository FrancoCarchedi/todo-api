const express = require('express');
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');
const validateRequest = require('../middlewares/validationMiddleware');
const { createTaskSchema, updateTaskSchema } = require('../utils/validationSchemas');

const router = express.Router();

router.get('/', authMiddleware, taskController.getAllTasks);
router.get('/:id', authMiddleware, taskController.getTaskById);
router.get('/user/:id', authMiddleware, taskController.getAllTasksByUser);
router.post('/', authMiddleware, validateRequest(createTaskSchema), taskController.createTask);
router.patch('/:id', authMiddleware, validateRequest(updateTaskSchema), taskController.updateTask);
router.delete('/:id', authMiddleware, taskController.deleteTask);

module.exports = router;
