import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    AUTHENTICATE_REQUEST,
    AUTHENTICATE_SUCCESS,
    AUTHENTICATE_FAILURE,
    LOGOUT,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
} from "../constants/constants";

import { useHistory} from 'react-router-dom'
import axios from 'axios';


export function loginRequest() {
    return {
        type: LOGIN_REQUEST
    };
}

export function loginSuccess(access_token, refresh_token, username) {
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    return {
        type: LOGIN_SUCCESS,
        payload: {
            access_token,
            refresh_token,
            username,
        },
    };
}

export function loginFailure(err) {
    localStorage.removeItem('token');
    return {
        type: LOGIN_FAILURE,
        payload: {
            status: err.response.status,
            statusText: err.response.statusText
        }
    }
}

export function loginUser(formData, history) {
    return function (dispatch) {
        dispatch(loginRequest());
        return axios.post('/auth/login', formData)
            .then(response => response.data)
            .then(response => {
            try{
                dispatch(loginSuccess(
                    response.access_token,
                    response.refresh_token,
                    response.username
                ));
                history.push('/');
            }
            catch (e) {
                alert(e + 'at <function loginUser>');
                dispatch(loginFailure({
                    response: {
                        status: 403,
                        statusText: 'Invalid token'
                    }
                }))
            }
        }).catch(err => {
            dispatch(loginFailure({
                response: {
                    status: 403,
                    statusText: 'Invalid username or password'
                }
            }))
        })
    }
}

export function authenticateRequest() {
    return {
      type: AUTHENTICATE_REQUEST
    };
}

export function authenticateSuccess(data) {
    return {
        type: AUTHENTICATE_SUCCESS,
        payload:{
            data
        }
    }
}

export function authenticateFailure(err) {
    return {
        type: AUTHENTICATE_FAILURE,
        payload: {
            status: err.status,
            statusText: err.statusText
        }
    }
}

export function authenticate(access_token, refresh_token) {
    // const jwt = require('jsonwebtoken');
    // const jti = jwt.decode(access_token, {complete:true}).payload.jti;
    return function (dispatch) {
        dispatch(authenticateRequest());
        return axios({
            method: 'post',
            url: '/auth/check_login',
            headers: {
                'Authorization': 'Bearer ' + access_token,
            }
        }).then(response => response.data).then(response => {
            try{
                dispatch(authenticateSuccess(response));
            }
            catch (err) {
                dispatch(authenticateFailure(err));
            }
        }).catch(err => {
            dispatch(authenticateFailure(err));
        });
    }
}

export function logout() {
    localStorage.removeItem('token');
    return {
        type: LOGOUT
    };
}

export function logoutAndRedirect() {
    return (dispatch) => {
        dispatch(logout());
        useHistory().push('/');
    };
}



export function registerRequest() {
    return {
        type: REGISTER_REQUEST,
    }
}

export function registerSuccess(token) {
    localStorage.setItem('token', token);
    return {
        type: REGISTER_SUCCESS,
        payload: {
            token
        }
    }
}

export function registerFailure(err) {
    localStorage.removeItem('token');
    return {
        type: REGISTER_FAILURE,
        payload: {
            status: err.response.status,
            statusText: err.response.statusText
        }
    }
}

export function registerUser(formData) {
    return function (dispatch) {
        dispatch(registerRequest());
        return axios.post('auth/register', formData).then(response => response.data).then(response => {
            try{
                dispatch(registerSuccess(response.token));
                useHistory.push('/');
            }
            catch (e) {
                dispatch(registerFailure({
                    response: {
                        status: 403,
                        statusText: 'Invalid token'
                    }
                }))
            }
        }).catch(err => {
            dispatch(registerFailure({
                response: {
                    status: 403,
                    statusText: 'User with that email already exists'
                }
            }))
        })
    }
}