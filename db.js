const Sequelize = require('sequelize');
const DB_HOST = process.env.DB_HOST || 'postgres://localhost:5432/react-shop';
const db = new Sequelize(DB_HOST, {logging: false });

module.exports = db;