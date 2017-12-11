// @flow
import { createStore, applyMiddleware, compose, type Store } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { type ReduxState, type Actions, type DispatchThunk } from '../types';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = composeEnhancers(applyMiddleware(thunk));
const store: Store<ReduxState, Actions | DispatchThunk> = createStore(rootReducer, middlewares);

export default store;
