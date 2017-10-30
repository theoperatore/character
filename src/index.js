import React from 'react';
import ReactDOM from 'react-dom';
import { createState } from './state';
import registerServiceWorker from './registerServiceWorker';
import registerDatabase from './registerDatabase';
import App from './App';

import 'firebaseui/dist/firebaseui.css';
import 'font-awesome/css/font-awesome.min.css';
import './index.css';
import './hippo.css';

const store = createState();

registerServiceWorker();
registerDatabase();

ReactDOM.render(<App store={store} />, document.getElementById('root'));
