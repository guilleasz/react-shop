// @flow
import { type Reducer } from 'redux';
import { type ProductsState, type ProductsActions } from '../../types';

const initialState: ProductsState = {
  items: [],
};

const productsReducer: Reducer<ProductsState, ProductsActions> = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        items: action.products,
      };
    case 'ADD_PRODUCT':
      return {
        ...state,
        items: [action.product, ...state.items],
      };
    default:
      return state;
  }
};

export default productsReducer;
