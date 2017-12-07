// @flow
import { createStore, type Store } from 'redux';
import rootReducer from './reducers';
import { type ReduxState, type Actions } from '../types';

const store: Store<ReduxState, Actions> = createStore(
  rootReducer,
  // magia para que funcione la extensión de redux del google Chrome.
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
