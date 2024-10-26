const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Test = require('./test.model'); // Importamos el modelo Test

const Project = sequelize.define('Project', {
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
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

// Relación: Un proyecto tiene muchas pruebas
Project.hasMany(Test, { foreignKey: 'projectId', as: 'Tests' });

module.exports = Project;
