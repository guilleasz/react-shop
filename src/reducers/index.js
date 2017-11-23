import { combineReducers } from 'redux';
import cart from './products';
import products from './products';

const rootReducer = combineReducers({
  cart,
  products,
});

export default rootReducer;

