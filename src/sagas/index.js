import { take, put, call, fork, select, takeEvery, all } from 'redux-saga/effects';
import {GET_PRODUCTS, receiveProducts, receiveCategories} from '../actions';
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

const getAllCategoriesAPI = () => axios.get(`${host}/api/categories`, {
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => response.data)
    .catch(err => {
      throw err;
    });

export function* getAllProductsAndCategories() {
  const products = yield call(getAllProductsAPI);
  const categories = yield call(getAllCategoriesAPI);
  yield [
    put(receiveProducts(products)),
    put(receiveCategories(categories))
  ];
}

export function* watchGetProducts() {
  /*
    takeEvery will fork a new `getAllProducts` task on each GET_ALL_PRODUCTS actions
    i.e. concurrent GET_ALL_PRODUCTS actions are allowed
  */
  yield takeEvery(GET_PRODUCTS, getAllProductsAndCategories);
}

export default function* root() {
 yield all([
    fork(getAllProductsAndCategories),
    fork(watchGetProducts),
  ])
}
