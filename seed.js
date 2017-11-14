const faker = require('faker');
const { Cart, Category, Product } = require('./models');
const db = require('./db');

const createCategory = () => Category.create({
  name: faker.commerce.department(),
});

const createCategories = (n) => {
  const categoriesPromises = [];
  for (let i = 0; i < n; i += 1) {
    categoriesPromises.push(createCategory());
  }
  return Promise.all(categoriesPromises);
};

const createProduct = categoryId => Product.create({
  name: faker.commerce.productName(),
  description: faker.lorem.paragraph(),
  image: `http://lorempixel.com/400/200/cats/${categoryId}/`,
  categoryId,
  availability: !!Math.round(Math.random()),
  price: faker.commerce.price(),
});

const createCatalogue = (n, categories) => {
  const productPromises = [];
  for (let i = 0; i < n; i += 1) {
    const categoryId = faker.random.arrayElement(categories).id;
    productPromises.push(createProduct(categoryId));
  }
  return Promise.all(productPromises);
};

const createCartItem = productId => Cart.create({
  quantity: faker.random.number(9) + 1,
  productId,
});

const createCart = (n, products) => {
  const cartItemPromises = [];
  for (let i = 0; i < n; i += 1) {
    const productId = faker.random.arrayElement(products).id;
    cartItemPromises.push(createCartItem(productId));
  }
  return Promise.all(cartItemPromises);
};

const generateShop = (nCat, nProd, nCart) =>
  db.sync({ force: true })
    .then(() => createCategories(nCat))
    .then(categories => createCatalogue(nProd, categories))
    .then(products => createCart(nCart, products))
    .catch(console.log);

generateShop(5, 100, 5);
