import { createStore } from 'redux';
import rootReducer from './reducers';

export default createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // magia para que funcione la extensión de redux del google Chrome.
);
