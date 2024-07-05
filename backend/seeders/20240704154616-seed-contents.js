// seeders/xxxx-seed-contents.js
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Contents', [
      {
        type: 'video',
        url: 'https://example.com/video1',
        moduleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Add more sample contents as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Contents', null, {});
  }
};
