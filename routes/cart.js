const router = require('express').Router();
const { Cart, Product } = require('../models');

module.exports = router;

router.get('/', (req, res, next) => {
  Cart.findAll({
    include: [Product],
  })
    .then(res.send.bind(res))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Cart.create(req.body)
    .then(res.status(201).send.bind(res))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  Cart.findById(req.params.id)
    .then(cart => cart.update(req.body))
    .then(res.send.bind(res))
    .catch(next);
});
