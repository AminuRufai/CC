'use strict';
const bcrypt = require('bcryptjs');
const fs = require('fs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [];
    const userData = [];
    for (let i = 1; i <= 21; i++) {
      let role = 'user';
      if (i === 1) role = 'admin';
      else if (i >= 2 && i <= 4) role = 'manager';

      const password = 'password123';
      const hashedPassword = await bcrypt.hash(password, 10);
      
      users.push({
        firstName: `First${i}`,
        lastName: `Last${i}`,
        email: `user${i}@example.com`,
        password: hashedPassword,
        role: role,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      userData.push({
        firstName: `First${i}`,
        lastName: `Last${i}`,
        email: `user${i}@example.com`,
        password: password,
        role: role
      });
    }

    fs.writeFileSync('seeded_users.json', JSON.stringify(userData, null, 2));

    return queryInterface.bulkInsert('Users', users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
