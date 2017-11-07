const router = require('express').Router();
const { Category } = require('../models');

module.exports = router;

router.get('/', (req, res, next) => {
  Category.findAll()
    .then(res.send.bind(res))
    .catch(next);
});