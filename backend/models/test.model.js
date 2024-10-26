const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Defect = require('./defect.model');

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
  status: {
    type: DataTypes.ENUM('passed', 'failed'),
    allowNull: false,
  },
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Asociación con defectos usando el alias correcto
Test.hasMany(Defect, { foreignKey: 'testId', as: 'TestDefects' });
Defect.belongsTo(Test, { foreignKey: 'testId', as: 'Test' });

module.exports = Test;
