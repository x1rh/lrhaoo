import React from 'react';
import ReactDOM from 'react-dom';

import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';

import './index.css';
import App from './containers/App/App';
import {createStore, applyMiddleware} from "redux";
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import reducer from "./reducers/combination";
import { createLogger } from 'redux-logger';

const middleware = process.env.NODE_ENV === 'development'?[thunk, createLogger()]:[thunk,];

const store = createStore(
    reducer,
    applyMiddleware(...middleware)
);

ReactDOM.render((
        <Provider store={store}>
            <Router>
                <Route path="/" component={App}/>
            </Router>
        </Provider>
    ),
    document.getElementById('root')
);

