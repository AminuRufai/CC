// seeders/xxxx-seed-quizzes.js
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Quizzes', [
      {
        question: 'What is the time complexity of binary search?',
        options: JSON.stringify(['O(n)', 'O(log n)', 'O(n^2)', 'O(1)']),
        correctAnswer: 1,
        moduleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Add more sample quizzes as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Quizzes', null, {});
  }
};
