import React from 'react';
import ReactDOM from 'react-dom';
import { createState } from './state';
import registerServiceWorker from './registerServiceWorker';
import registerDatabase from './registerDatabase';

import 'firebaseui/dist/firebaseui.css';
import 'font-awesome/css/font-awesome.min.css';
import './index.css';
import './hippo.css';

// import App after global css so that components can override
// the styles as neccessary
import App from './App';
const store = createState();

registerServiceWorker();
registerDatabase();

ReactDOM.render(<App store={store} />, document.getElementById('root'));
