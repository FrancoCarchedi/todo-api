const Task = require('../models/task');
const moment = require('moment');

const getAllTasks = async () => {
  return await Task.findAll();
}

const getTaskById = async (taskId) => {
  const task = await Task.findOne({ where: { id: taskId } });

  if (!task) {
    throw new Error('Tarea no encontrada');
  }

  return task;
};

const getAllTasksByUser = async (userId) => {
  return await Task.findAll({ where: { userId } });
};

const createTask = async (taskData) => {

  if (taskData.endsDate) {
    const parsedEndsDate = moment(taskData.endsDate, 'DD/MM/YYYY').toDate();
    taskData.endsDate = parsedEndsDate;
  }

  return await Task.create(taskData);
};

const updateTask = async (taskId, taskData) => {
  const task = await getTaskById(taskId);

  if (taskData.endsDate) {
    const parsedEndsDate = moment(taskData.endsDate, 'DD/MM/YYYY').toDate();
    taskData.endsDate = parsedEndsDate;
  }

  return await task.update(taskData);
};

const deleteTask = async(taskId) => {
  const task = await getTaskById(taskId);

  await task.destroy();
  return { message: 'Tarea eliminada correctamente' };
}

module.exports = { getAllTasks, getTaskById, getAllTasksByUser, createTask, updateTask, deleteTask };
