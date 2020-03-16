import React from 'react';
import ReactDOM from 'react-dom';
import MyRoute from './router';
import './style/common.css'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<MyRoute />, document.getElementById('root'));

serviceWorker.unregister();
