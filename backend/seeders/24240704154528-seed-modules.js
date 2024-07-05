// seeders/xxxx-seed-modules.js
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Modules', [
      {
        title: 'Introduction to Algorithms',
        description: 'Basics of algorithms',
        duration: 5,
        contentType: 'video',
        courseId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Add more sample modules as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Modules', null, {});
  }
};
