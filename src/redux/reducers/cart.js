// @flow
import { type Reducer } from 'redux';
import { type CartState, type CartActions } from '../../types';

const cartReducer: Reducer<CartState, CartActions> = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product } = action;
      const index = state.findIndex(elem => elem.product.id === product.id);
      if (index === -1) {
        return [
          ...state,
          {
            product: action.product,
            quantity: 1,
          }];
      }
      return [
        ...state.slice(0, index),
        {
          product: action.product,
          quantity: state[index].quantity + 1,
        },
        ...state.slice(index + 1),
      ];
    }
    case 'REMOVE_FROM_CART':
      return [...state.slice(0, action.index), ...state.slice(action.index + 1)];
    default:
      return state;
  }
};


export default cartReducer;
