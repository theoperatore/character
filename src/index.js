import React from 'react';
import ReactDOM from 'react-dom';
import { createState } from './state';
import registerServiceWorker from './registerServiceWorker';
import App from './App';

import 'font-awesome/css/font-awesome.min.css';
import './index.css';
import './hippo.css';

const store = createState();

ReactDOM.render(
  <App store={store} />,
  document.getElementById('root')
);
registerServiceWorker();
