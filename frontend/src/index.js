import React from 'react';
import ReactDOM from 'react-dom';

import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';

import './index.css';
import App from './containers/App/App';
import Article from './components/Article/Article';
import Login from './components/Login/Login';
import Register from "./components/Register/Register";
import {createStore, applyMiddleware} from "redux";
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import reducer from "./reducers/combination";
import { createLogger } from 'redux-logger';

import * as serviceWorker from './serviceWorker';

const middleware = [thunk, createLogger()];

const store = createStore(
    reducer,
    applyMiddleware(...middleware)
);

ReactDOM.render((
        <Provider store={store}>
            <Router>
                <Route path="/" exact component={App}/>
                <Route path="/article/:id" component={Article}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
            </Router>
        </Provider>
    ),
    document.getElementById('root')
);

