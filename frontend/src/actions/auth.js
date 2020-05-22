import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,

    AUTHENTICATE_REQUEST,
    AUTHENTICATE_SUCCESS,
    AUTHENTICATE_FAILURE,

    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,

    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,

    REFRESH_ACCESS_TOKEN_REQUEST,
    REFRESH_ACCESS_TOKEN_SUCCESS,
    REFRESH_ACCESS_TOKEN_FAILURE
} from "../constants/constants";

import axios from 'axios';

const jwt = require('jsonwebtoken');

export function loginRequest() {
    return {
        type: LOGIN_REQUEST
    };
}

export function loginSuccess(accessToken, refreshToken, username, email, uid) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    return {
        type: LOGIN_SUCCESS,
        payload: {
            accessToken,
            refreshToken,
            username,
            email,
            uid
        },
    };
}

export function loginFailure(err) {
    return {
        type: LOGIN_FAILURE,
        err: err
    }
}

export function loginUser(email, password, history) {
    return function (dispatch) {
        dispatch(loginRequest());
        let formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        return axios.post('/auth/login', formData)
            .then(response => response.data)
            .then(response => {
                try {
                    const {username, email, uid} = jwt.decode(response.accessToken, {complete: true}).payload.user_claims;
                    dispatch(loginSuccess(
                        response.accessToken,
                        response.refreshToken,
                        username,
                        email,
                        uid
                    ));
                    history.push('/');
                } catch (e) {
                    alert(e + 'at <function loginUser>');
                    dispatch(loginFailure({
                        response: {
                            status: 403,
                            statusText: 'Invalid token'
                        }
                    }))
                }
            }).catch(err => {
                dispatch(loginFailure(err));
            })
    }
}

export function refreshAccessTokenRequest() {
    return {
        type: REFRESH_ACCESS_TOKEN_REQUEST
    }
}

export function refreshAccessTokenSuccess(accessToken, username, email, uid) {
    localStorage.setItem('accessToken', accessToken);
    return {
        type: REFRESH_ACCESS_TOKEN_SUCCESS,
        payload: {
            accessToken,
            username,
            email,
            uid
        }
    }
}

export function refreshAccessTokenFailure(err) {
    return {
        type: REFRESH_ACCESS_TOKEN_FAILURE,
        err: err
    }
}

export function refreshAccessToken() {
    return function (dispatch) {
        dispatch(refreshAccessTokenRequest());
        const refreshToken = localStorage.getItem('refreshToken');
        return axios({
            method: 'post',
            url: '/auth/refresh',
            headers: {
                'Authorization': 'Bearer ' + refreshToken,
            }
        }).then(response => response.data).then(response => {
            try {
                const {username, email, uid} = jwt.decode(response.accessToken, {complete: true}).payload.user_claims;
                dispatch(refreshAccessTokenSuccess(response.accessToken, username, email, uid));
            } catch (err) {
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

export function authenticateSuccess(username, email, uid) {
    return {
        type: AUTHENTICATE_SUCCESS,
        payload: {
            username,
            email,
            uid
        }
    }
}

export function authenticateFailure(err) {
    return {
        type: AUTHENTICATE_FAILURE,
        err: err
    }
}

export function authenticate(accessToken = null, refreshToken = null, history, flag = false) {
    // flag为复用函数而设置的, 它为false时即使两个token都过期了也不会重定向到登陆界面
    return function (dispatch) {
        dispatch(authenticateRequest());
        if (accessToken === null && refreshToken === null) {
            console.log('two tokens are null');
            dispatch(authenticateFailure('two tokens are null'));
            if (flag) {
                history.push('/login');
            }
        } else {

            const accessTokenExpirationTime = jwt.decode(accessToken, {complete: true}).payload.exp;
            const refreshTokenExpirationTime = jwt.decode(refreshToken, {complete: true}).payload.exp;
            const now = new Date().getTime() / 1000;

            if (accessTokenExpirationTime < now) {
                console.log('access token is expired');
                if (refreshTokenExpirationTime < now) {
                    console.log('refresh token is expired');
                    dispatch(authenticateFailure('access token and refresh token are expired'));
                    if (flag) {
                        history.push('/login');
                    }
                } else {
                    dispatch(refreshAccessToken());
                }
            } else {
                const {username, email, uid} = jwt.decode(accessToken, {complete: true}).payload.user_claims;
                dispatch(authenticateSuccess(username, email, uid));
            }
        }
    };
}

export function logoutRequest() {
    return {
        type: LOGOUT_REQUEST
    };
}

export function logoutSuccess() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return {
        type: LOGOUT_SUCCESS,
    };
}

export function logoutFailue(err) {
    return {
        type: LOGOUT_FAILURE,
        err: err
    };
}

export function logout() {
    return function (dispatch) {
        dispatch(logoutRequest());
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        let formData = new FormData();
        formData.append('refreshToken', refreshToken);
        return axios({
            method: 'delete',
            url: '/auth/token_revoke',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
            data: formData
        })
            .then(response => response.data)
            .then(response => {
                console.log(response);
                dispatch(logoutSuccess());
            }).catch(err => {
                dispatch(logoutFailue(err))
            })

    }
}


export function registerRequest() {
    return {
        type: REGISTER_REQUEST,
    }
}

export function registerSuccess(accessToken, refreshToken, username, email, uid) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    return {
        type: REGISTER_SUCCESS,
        payload: {
            accessToken,
            refreshToken,
            username,
            email,
            uid
        }
    }
}

export function registerFailure(err) {
    return {
        type: REGISTER_FAILURE,
        payload: {
            status: err.response.status,
            statusText: err.response.statusText
        }
    }
}

export function registerUser(username, email, password, verifyCode, history) {
    return function (dispatch) {
        dispatch(registerRequest());

        let formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('verify_code', verifyCode);

        return axios.post('auth/register', formData)
            .then(response => response.data)
            .then(response => {
                try {
                    const {username, email, uid} = jwt.decode(response.accessToken, {complete: true}).payload.user_claims;
                    dispatch(registerSuccess(
                        response.accessToken,
                        response.refreshToken,
                        username,
                        email,
                        uid
                    ));
                    history.push('/');
                } catch (err) {
                    console.log(err);
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
                }));
            })
    }
}