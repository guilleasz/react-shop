const S = require('sequelize');
const db = require('../db');

module.exports = db.define('cart', {
  quantity: {
    type: S.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1,
    }
  },
})