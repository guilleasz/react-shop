// @flow
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { render } from 'react-dom';
import App from './containers/App'

const appDiv = document.getElementById('app')

appDiv && render(<App />, appDiv);