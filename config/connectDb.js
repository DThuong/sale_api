const { Sequelize } = require('sequelize');
const fs = require('fs');
require('dotenv').config();

// ✅ THÊM LOG ĐỂ DEBUG
console.log('=== DATABASE CONFIG DEBUG ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_SSL_CA_PATH:', process.env.DB_SSL_CA_PATH);
console.log('SSL file exists:', process.env.DB_SSL_CA_PATH ? fs.existsSync(process.env.DB_SSL_CA_PATH) : false);
console.log('============================');

let dialectOptions = {};

if (process.env.DB_SSL_CA_PATH && fs.existsSync(process.env.DB_SSL_CA_PATH)) {
  console.log('✅ Using SSL with certificate file');
  dialectOptions = {
    ssl: {
      ca: fs.readFileSync(process.env.DB_SSL_CA_PATH)
    }
  };
} else if (process.env.NODE_ENV === 'production') {
  console.log('✅ Using SSL without certificate verification (Azure mode)');
  dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  };
} else {
  console.log('⚠️ No SSL configured');
}

const sequelize = new Sequelize(
  process.env.DB_NAME || 'demo_sale_api',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || 'Thuong2002@#',
  {
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
    dialectOptions: dialectOptions,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: process.env.NODE_ENV === 'production' ? false : console.log
  }
);

module.exports = sequelize;