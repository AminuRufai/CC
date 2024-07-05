// migrations/xxxx-add-duration-to-courses.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Courses', 'duration', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0, // You can set a default value if needed
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Courses', 'duration');
  }
};
