// @flow
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// Redux-Saga
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';

import App from './containers/App';

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  rootReducer,
  applyMiddleware(sagaMiddleware, createLogger()),
);
sagaMiddleware.run(rootSaga);

const appDiv = document.getElementById('app');

if (appDiv) {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>, appDiv);
}

