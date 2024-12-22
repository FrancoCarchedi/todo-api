const taskService = require('../services/taskService');

const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getTaskById = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await taskService.getTaskById(id);
    return res.status(200).json(task);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const getAllTasksByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const tasks = await taskService.getAllTasksByUser(id);
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createTask = async (req, res) => {
  const taskData = req.body;

  try {
    const newTask = await taskService.createTask(taskData);
    return res.status(201).json(newTask);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const taskData = req.body;

  try {
    const updatedTask = await taskService.updateTask(id, taskData);
    return res.status(200).json(updatedTask);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await taskService.deleteTask(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

module.exports = { getAllTasks, getAllTasksByUser, getTaskById, createTask, updateTask, deleteTask };
