const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Project = require('./project.model'); // Relación con el proyecto

const Test = sequelize.define('Test', {
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
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM('pending', 'passed', 'failed'),
    defaultValue: 'pending',
  },
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Project,
      key: 'id',
    },
  },
});

module.exports = Test;
