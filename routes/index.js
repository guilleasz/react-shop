const router = require('express').Router();
const categoriesRoutes = require('./categories');
const productsRoutes = require('./products');
const cartRoutes = require('./cart');

router.use('/categories', categoriesRoutes);
router.use('/products', productsRoutes);
router.use('/cart', cartRoutes);

module.exports = router;

