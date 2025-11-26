'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      // Smartphones
      {
        name: 'iPhone 15 Pro Max',
        price: 1199.99,
        desc: 'Latest Apple flagship with A17 Pro chip, titanium design, and advanced camera system',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Samsung Galaxy S24 Ultra',
        price: 1099.99,
        desc: 'Premium Android phone with S Pen, 200MP camera, and AI features',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Google Pixel 8 Pro',
        price: 899.99,
        desc: 'Best Android camera phone with Google AI and pure Android experience',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // Laptops
      {
        name: 'MacBook Pro 16" M3',
        price: 2499.99,
        desc: 'Powerful laptop for professionals with M3 Max chip and stunning Liquid Retina XDR display',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Dell XPS 15',
        price: 1799.99,
        desc: 'Premium Windows laptop with 4K OLED display and Intel Core i9',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lenovo ThinkPad X1 Carbon',
        price: 1599.99,
        desc: 'Business ultrabook with legendary keyboard and military-grade durability',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // Tablets
      {
        name: 'iPad Pro 12.9"',
        price: 1099.99,
        desc: 'Professional tablet with M2 chip and ProMotion display',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Samsung Galaxy Tab S9',
        price: 799.99,
        desc: 'Premium Android tablet with S Pen included',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // Audio
      {
        name: 'AirPods Pro 2',
        price: 249.99,
        desc: 'Premium wireless earbuds with active noise cancellation',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sony WH-1000XM5',
        price: 399.99,
        desc: 'Industry-leading noise cancelling headphones',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bose QuietComfort Ultra',
        price: 429.99,
        desc: 'Premium headphones with spatial audio and immersive sound',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // Smartwatches
      {
        name: 'Apple Watch Series 9',
        price: 399.99,
        desc: 'Advanced health and fitness tracking with always-on display',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Samsung Galaxy Watch 6',
        price: 299.99,
        desc: 'Feature-rich smartwatch with comprehensive health monitoring',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // Cameras
      {
        name: 'Sony A7 IV',
        price: 2499.99,
        desc: 'Professional mirrorless camera with 33MP full-frame sensor',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Canon EOS R6 Mark II',
        price: 2399.99,
        desc: 'Versatile full-frame mirrorless for photo and video',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // Gaming
      {
        name: 'PlayStation 5',
        price: 499.99,
        desc: 'Next-gen gaming console with 4K gaming and ultra-fast SSD',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Xbox Series X',
        price: 499.99,
        desc: 'Most powerful Xbox with 4K 120fps gaming',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Nintendo Switch OLED',
        price: 349.99,
        desc: 'Portable gaming console with vibrant OLED screen',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // Accessories
      {
        name: 'Logitech MX Master 3S',
        price: 99.99,
        desc: 'Professional wireless mouse with ergonomic design',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Keychron K8 Pro',
        price: 119.99,
        desc: 'Wireless mechanical keyboard with hot-swappable switches',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Anker PowerCore 26800',
        price: 59.99,
        desc: 'High-capacity portable charger with fast charging',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};