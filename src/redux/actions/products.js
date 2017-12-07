export function setProducts(products) {
  return {
    type: 'SET_PRODUCTS',
    products,
  };
}

export function addProduct(product) {
  return {
    type: 'ADD_PRODUCT',
    product,
  };
}