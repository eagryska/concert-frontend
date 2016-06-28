import Concert from './Concert';
import React from 'react';
import { render } from 'react-dom';
require('es6-promise').polyfill();
require('isomorphic-fetch');

render(<Concert />, document.getElementById('root'));
