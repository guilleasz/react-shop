export const GET_PRODUCTS = 'GET_PRODUCTS';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';



export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CHANGE_QUANTITY = 'CHANGE_QUANTITY';
export const RECEIVE_CART = 'RECEIVE_CART';

export const CHECKOUT_REQUEST = 'CHECKOUT_REQUEST'
export const CHECKOUT_SUCCESS = 'CHECKOUT_SUCCESS'
export const CHECKOUT_FAILURE = 'CHECKOUT_FAILURE'


export function getAllProducts() {
  return {
    type: GET_PRODUCTS
  }
}

export function receiveProducts(products) {
  return {
    type: RECEIVE_PRODUCTS,
    products: products
  }
}

export function getAllCategories() {
  return {
    type: GET_CATEGORIES
  }
}

export function receiveCategories(categories) {
  return {
    type: RECEIVE_CATEGORIES,
    categories: categories
  }
}

export function addToCart(productId) {
  return {
    type: ADD_TO_CART,
    productId
  }
}

export function changeQuantity(productId, quantity) {
  return {
    type: CHANGE_QUANTITY,
    productId,
    quantity,
  }
}

export function removeFromCart(productId) {
  return {
    type: REMOVE_FROM_CART,
    productId
  }
}

export function receiveCart(cart) {
  return {
    type: RECEIVE_CART,
    cart
  }
}

export function checkout() {
  return {
    type: CHECKOUT_REQUEST
  }
}

export function checkoutSuccess(cart) {
  return {
    type: CHECKOUT_SUCCESS,
    cart
  }
}

export function checkoutFailure(error) {
  return {
    type: CHECKOUT_FAILURE,
    error
  }
}
