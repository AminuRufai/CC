const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const PreviousEmployee = sequelize.define('PreviousEmployee', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  roles: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  removedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  timestamps: false,
});

module.exports = PreviousEmployee;
