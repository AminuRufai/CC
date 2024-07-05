// seeders/xxxx-seed-courses.js
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Courses', [
      {
        title: 'Introduction to Machine Learning',
        description: 'Learn the basics of machine learning',
        duration: 10,
        level: 'Beginner',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Add more sample courses as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Courses', null, {});
  }
};
