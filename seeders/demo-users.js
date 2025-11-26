'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Hash password trước
    const hashedPassword = await bcrypt.hash('Password123!', 10);
    
    return queryInterface.bulkInsert('Users', [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        type: 'ADMIN',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Nguyen Van Thuong',
        email: 'thuong@example.com',
        password: hashedPassword,
        type: 'ADMIN',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: hashedPassword,
        type: 'CLIENT',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: hashedPassword,
        type: 'CLIENT',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mike Johnson',
        email: 'mike@example.com',
        password: hashedPassword,
        type: 'CLIENT',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sarah Williams',
        email: 'sarah@example.com',
        password: hashedPassword,
        type: 'CLIENT',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'David Brown',
        email: 'david@example.com',
        password: hashedPassword,
        type: 'CLIENT',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Emily Davis',
        email: 'emily@example.com',
        password: hashedPassword,
        type: 'CLIENT',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Manager User',
        email: 'manager@example.com',
        password: hashedPassword,
        type: 'MANAGER',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Test Client',
        email: 'testclient@example.com',
        password: hashedPassword,
        type: 'CLIENT',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};