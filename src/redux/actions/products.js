// @flow
import { type ActionCreator } from 'redux';
import { type Product, type AddProductAction, type SetProductsAction } from '../../types';

export const setProducts: ActionCreator<SetProductsAction, Product[]> = products => ({
  type: 'SET_PRODUCTS',
  products,
});

export const addProduct: ActionCreator<AddProductAction, Product> = product => ({
  type: 'ADD_PRODUCT',
  product,
});
