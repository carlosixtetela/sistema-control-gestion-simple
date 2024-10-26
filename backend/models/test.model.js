const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

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
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'passed', 'failed'),
    allowNull: false,
    defaultValue: 'pending', // Valor predeterminado
  },
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Test;
