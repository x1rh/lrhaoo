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
    REFRESH_ACCESS_TOKEN_REQUEST,
    REFRESH_ACCESS_TOKEN_SUCCESS,
    REFRESH_ACCESS_TOKEN_FAILURE
} from "../constants/constants";

import axios from 'axios';



export function loginRequest() {
    return {
        type: LOGIN_REQUEST
    };
}

export function loginSuccess(accessToken, refreshToken, username) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    return {
        type: LOGIN_SUCCESS,
        payload: {
            accessToken,
            refreshToken,
            username,
        },
    };
}

export function loginFailure(err) {
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
                    response.accessToken,
                    response.refreshToken,
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

export function refreshAccessTokenRequest() {
    return{
        type: REFRESH_ACCESS_TOKEN_REQUEST
    }
}

export function refreshAccessTokenSuccess(accessToken) {
    localStorage.setItem('accessToken', accessToken);
    return {
        type: REFRESH_ACCESS_TOKEN_SUCCESS,
        payload: {
            accessToken
        }
    }
}

export function refreshAccessTokenFailure(err) {
    return {
        type: REFRESH_ACCESS_TOKEN_FAILURE,
        err:err
    }
}

export function refreshAccessToken() {
    console.log('i was called as refreshAccessToken()');
    return function (dispatch) {
        console.log('i was called as refreshAccessToken()');
        dispatch(refreshAccessTokenRequest());
        const refreshToken = localStorage.getItem('refreshToken');
        return axios({
            method: 'post',
            url: '/auth/refresh',
            headers: {
                'Authorization': 'Bearer ' + refreshToken,
            }
        }).then(response => response.data).then(response => {
            try{
                console.log('what is refresh response:');
                console.log(response.accessToken);
                dispatch(refreshAccessTokenSuccess(response.accessToken));
            }
            catch (err) {
                dispatch(refreshAccessTokenFailure(err));
            }
        }).catch(err => {
            dispatch(refreshAccessTokenFailure(err));
        });
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
        err:err
    }
}

export function authenticate(accessToken=null, refreshToken=null, history, flag=false) {
    // flag为复用函数而设置的, 它为false时即使两个token都过期了也不会重定向到登陆界面
    return function (dispatch) {
        dispatch(authenticateRequest());
        if (accessToken === null && refreshToken === null) {
            console.log('two tokens are null');
            dispatch(authenticateFailure('two tokens are null'));
            if(flag){
                history.push('/login');
            }
        } else {
            console.log('i was called');
            const jwt = require('jsonwebtoken');
            const accessTokenExpirationTime = jwt.decode(accessToken, {complete: true}).payload.exp;
            const refreshTokenExpirationTime = jwt.decode(refreshToken, {complete: true}).payload.exp;
            const now = new Date().getTime() / 1000;

            console.log(new Date(accessTokenExpirationTime*1000).toUTCString());
            console.log(new Date().toUTCString());

            if (accessTokenExpirationTime < now) {
                console.log('access token is expired');
                if (refreshTokenExpirationTime < now) {
                    console.log('refresh token is expired');
                    dispatch(authenticateFailure('access token and refresh token are expired'));
                    if(flag){
                        history.push('/login');
                    }
                } else {
                    console.log('i was called 2...');
                    dispatch(refreshAccessToken());
                }
            } else {
                // console.log('yes');
                dispatch(authenticateSuccess());
            }
        }
    };
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
        // todo: history.push('/')
    };
}



export function registerRequest() {
    return {
        type: REGISTER_REQUEST,
    }
}

export function registerSuccess(accessToken, refreshToken, username) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    return {
        type: REGISTER_SUCCESS,
        payload: {
            accessToken,
            refreshToken,
            username
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

export function registerUser(formData, history) {
    return function (dispatch) {
        dispatch(registerRequest());
        return axios.post('auth/register', formData)
            .then(response => response.data)
            .then(response => {
                console.log(response);
                try{
                    dispatch(registerSuccess(
                        response.accessToken,
                        response.refreshToken,
                        response.username
                    ));
                    history.push('/');
                }
                catch (err) {
                    dispatch(registerFailure({
                        response: {
                            status: 403,
                            statusText: err.statusText
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