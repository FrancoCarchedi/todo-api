const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  endsDate: {
    type: DataTypes.DATE,
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed'),
    allowNull: false
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

module.exports = Task;