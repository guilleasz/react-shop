const S = require('sequelize');
const db = require('../db');

module.exports = db.define('category', {
  name: {
    allowNull: false,
    type: S.STRING,
  },
});

