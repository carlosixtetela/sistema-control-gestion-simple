const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Test = require('./test.model'); // Relación con la prueba

const Defect = sequelize.define('Defect', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM('open', 'in-progress', 'resolved'),
    defaultValue: 'open',
  },
  testId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Test,
      key: 'id',
    },
  },
});

module.exports = Defect;
