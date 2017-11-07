const Product = require('./Product');
const Category = require('./Category');
const Cart = require('./Cart');

Product.belongsTo(Category, { foreignKey: { allowNull: false } });

Cart.belongsTo(Product, { foreignKey: { allowNull: false } });

module.exports = {
  Category,
  Product,
  Cart,
}

