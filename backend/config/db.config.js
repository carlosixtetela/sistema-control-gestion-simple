const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bx5ikdtwgrhibpgi99jk', 'udqzb0jo8kselm2w', 'JxSVsHFQNzz7tyWZ8ING', {
  host: 'bx5ikdtwgrhibpgi99jk-mysql.services.clever-cloud.com',
  dialect: 'mysql',
});

module.exports = sequelize;
