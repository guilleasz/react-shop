import { take, put, call, fork, select, takeEvery, all } from 'redux-saga/effects';
import {GET_PRODUCTS, GET_CATEGORIES, RECEIVE_CATEGORIES,  receiveProducts, receiveCategories} from '../actions';
import axios from 'axios';

const host = 'http://localhost:3000';


const getAllProductsAPI = () => axios.get(`${host}/api/products`, {
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => response.data)
    .catch(err => {
      throw err;
    });

// const getAllCategoriesAPI = () => axios.get(`${host}/api/categories`, {
//       headers: {
//         'Accept': 'application/json'
//       }
//     }).then(response => response.data)
//     .catch(err => {
//       throw err;
//     });

// nuestro Saga: este realizará la accion asincrónica
export function* getAllProductsAndCategories() {
  const products = yield call(getAllProductsAPI);
  const categories = yield call(axios.get, `${host}/api/categories`);
  yield [
    put(receiveProducts(products)),
    put(receiveCategories(categories.data))
  ];
}

// export function* getAllProducts() {
//   const products = yield call(getAllProductsAPI);
//   yield take(RECEIVE_CATEGORIES);
//   yield put(receiveProducts(products));
// }

// export function* getAllCategories() {
//   const categories = yield call(getAllCategoriesAPI);
//   yield put(receiveCategories(categories));
// }

// El watcher Saga: va a invocar a getAllProductsAndCategories en cada GET_PRODUCTS
export function* watchGetProducts() {
  yield takeEvery(GET_PRODUCTS, getAllProductsAndCategories);
}

export default function* root() {
 yield all([
    fork(watchGetProducts),
 ])
}
