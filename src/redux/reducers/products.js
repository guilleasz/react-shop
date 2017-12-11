// @flow
import { type Reducer } from 'redux';
import { type ProductsState, type ProductsActions } from '../../types';

const initialState: ProductsState = {
  items: [],
  loading: false,
};

const productsReducer: Reducer<ProductsState, ProductsActions> = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        items: action.products,
        loading: false,
      };
    case 'ADD_PRODUCT':
      return {
        ...state,
        items: [action.product, ...state.items],
      };
    case 'FETCHING_PRODUCTS':
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default productsReducer;
