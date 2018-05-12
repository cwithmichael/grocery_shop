import React from 'react';
import ReactDOM from 'react-dom';
// Import css
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const router = (
    <Router>
        <Route path='/' component={App}></Route>
    </Router>
)
ReactDOM.render(router, document.getElementById('root'));
registerServiceWorker();