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
    REGISTER_FAILURE, REFRESH_ACCESS_TOKEN_REQUEST, REFRESH_ACCESS_TOKEN_SUCCESS, REFRESH_ACCESS_TOKEN_FAILURE
} from "../constants/constants";

const initialState = {
    accessToken: null,
    refreshToken: null,
    username: null,
    email: null,
    uid: null,
    isAuthenticated: false,
    isAuthenticating: false
};

export default function reducer(state = initialState, action) {
    switch (action.type) {                          // todo logic needed to be done
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                isAuthenticating: true,
                isAuthenticated: false,
            });
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                refreshToken: action.payload.refreshToken,
                accessToken: action.payload.accessToken,
                isAuthenticated: true,
                isAuthenticating: false,
                username: action.payload.username,
                email: action.payload.email,
                uid: action.payload.uid
            });
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                isAuthenticating: false,
                isAuthenticated: false,
            });
        case AUTHENTICATE_REQUEST:
            return Object.assign({}, state, {
                isAuthenticating: true,
                isAuthenticated: false,
            });
        case AUTHENTICATE_SUCCESS:
            return Object.assign({}, state, {
                isAuthenticated: true,
                isAuthenticating: false,
                username: action.payload.username,
                email : action.payload.email,
                uid : action.payload.uid,
            });
        case AUTHENTICATE_FAILURE:
            return Object.assign({}, state, {
                isAuthenticated: false,
                isAuthenticating: false
            });
        case LOGOUT:
            return Object.assign({}, state, {
                isAuthenticated: false,
                username: '',
                email: '',
                uid: ''
            });
        case REGISTER_REQUEST:
            return Object.assign({}, state, {});
        case REGISTER_SUCCESS:
            return Object.assign({}, state, {
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                username: action.payload.username,
                email: action.payload.email,
                uid: action.payload.uid,
                isAuthenticated: true
            });
        case REGISTER_FAILURE:
            return Object.assign({}, state, {
                isAuthenticated: false
            });
        case REFRESH_ACCESS_TOKEN_REQUEST:
            return Object.assign({}, state, {
                isAuthenticating: true,
            });
        case REFRESH_ACCESS_TOKEN_SUCCESS:
            return Object.assign({}, state, {
                accessToken: action.payload.accessToken,
                isAuthenticated: true,
                username: action.payload.username,
                email: action.payload.email,
                uid: action.payload.uid,
            });
        case REFRESH_ACCESS_TOKEN_FAILURE:
            return Object.assign({}, state, {
                isAuthenticated: false
            });
        default:
            return state;
    }
}