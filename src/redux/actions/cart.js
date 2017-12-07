// @flow
import { type ActionCreator } from 'redux';
import { type Product, type AddToCartAction, type RemoveFromCartAction } from '../../types';

export const addToCart: ActionCreator<AddToCartAction, Product> = product => ({
  type: 'ADD_TO_CART',
  product,
});

export const removeFromCart: ActionCreator<RemoveFromCartAction, number> = index => ({
  type: 'REMOVE_FROM_CART',
  index,
});
