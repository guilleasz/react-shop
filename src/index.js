// @flow
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { render } from 'react-dom';

const appDiv = document.getElementById('app')

appDiv && render(<div>Hello World</div>, appDiv);
