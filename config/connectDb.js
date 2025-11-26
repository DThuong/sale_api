const fs = require('fs');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  dialect: 'mysql',
  dialectOptions: {
    ssl:{ca:fs.readFileSync(process.env.DB_SSL_CA_PATH)}
  },
});

module.exports = sequelize;
