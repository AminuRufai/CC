const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('cosmic_connection', 'postgres', 'Knowledge.1', {
  host: '127.0.0.1',
  dialect: 'postgres',
});

module.exports = sequelize;
