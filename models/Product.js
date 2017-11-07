const S = require('sequelize');
const db = require('../db');

module.exports = db.define('product', {
  name: {
    allowNull: false,
    type: S.STRING,
  },
  description: {
    type: S.TEXT,
    defaultValue: 'No description.',
  },
  price: {
    type: S.STRING,
    allowNull: false,
  },
  availability: {
    type: S.BOOLEAN,
    defaultValue: true,
  },
  image: {
    type: S.STRING,
    defaultValue: 'https://vignette3.wikia.nocookie.net/shokugekinosoma/images/6/60/No_Image_Available.png/revision/latest?cb=20150708082716'
  }
});
