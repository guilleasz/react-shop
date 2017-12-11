// @flow
import { type ActionCreator } from 'redux';
import axios, { type $AxiosXHR } from 'axios';
import { type Product, type AddProductAction, type SetProductsAction, type FetchingProductsAction, type DispatchThunk } from '../../types';

export const setProducts: ActionCreator<SetProductsAction, Product[]> = products => ({
  type: 'SET_PRODUCTS',
  products,
});

export const addProduct: ActionCreator<AddProductAction, Product> = product => ({
  type: 'ADD_PRODUCT',
  product,
});

export const fetchingProducts: ActionCreator<FetchingProductsAction, void> = () => ({
  type: 'FETCHING_PRODUCTS',
});

export const fetchProducts = () => (dispatch: DispatchThunk) => {
  dispatch(fetchingProducts());
  return axios.get('http://develop.plataforma5.la:3000/api/products')
    .then((res: $AxiosXHR<Product[]>) => res.data)
    .then(products => dispatch(setProducts(products)));
};
