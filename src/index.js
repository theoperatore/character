import React from 'react';
import ReactDOM from 'react-dom';
import { createState } from './state';
import registerServiceWorker from './registerServiceWorker';
import App from './App';

import './index.css';
import './hippo.css';

const store = createState();

ReactDOM.render(
  <App store={store} />,
  document.getElementById('root')
);
registerServiceWorker();
