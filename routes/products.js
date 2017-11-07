const router = require('express').Router();
const { Product } = require('../models');

module.exports = router;

router.get('/', (req, res, next) => {
  Product.findAll()
    .then(res.send.bind(res))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then((product) => {
      if (!product) res.sendStatus(404);
      else res.send(product);
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  Product.create(req.body)
    .then(res.status(201).send.bind(res))
    .catch(next);
});