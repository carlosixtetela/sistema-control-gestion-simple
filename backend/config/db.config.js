const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sistema_gestion_pruebas', 'pruebas_user', 'Cidl2024_..', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
