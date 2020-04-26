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
    isAuthenticated: false,
    isAuthenticating: false
};

export default function reducer(state=initialState, action){
    switch (action.type) {                          // todo logic needed to be done
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                isAuthenticating: true
            });
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                refreshToken: action.payload.refreshToken,
                accessToken: action.payload.accessToken,
                username: action.payload.username,
                isAuthenticated: true
            });
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                isAuthenticating: false
            });
        case AUTHENTICATE_REQUEST:
            return Object.assign({}, state, {
               isAuthenticating: true
            });
        case AUTHENTICATE_SUCCESS:
            return Object.assign({}, state, {
               isAuthenticated: true,
               isAuthenticating: false
            });
        case AUTHENTICATE_FAILURE:
            return Object.assign({}, state, {
               isAuthenticated: false,
               isAuthenticating: false
            });
        case LOGOUT:
            return Object.assign({}, state, {

            });
        case REGISTER_REQUEST:
            return Object.assign({}, state, {

            });
        case REGISTER_SUCCESS:
            return Object.assign({}, state, {
                username: action.payload.username,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                isAuthenticated: true
            });
        case REGISTER_FAILURE:
            return Object.assign({}, state, {
                isAuthenticated: false
            });
        case REFRESH_ACCESS_TOKEN_REQUEST:
            return Object.assign({}, state, {
            });
        case REFRESH_ACCESS_TOKEN_SUCCESS:
            return Object.assign({}, state, {
                accessToken: action.payload.accessToken
            });
        case REFRESH_ACCESS_TOKEN_FAILURE:
            return Object.assign({}, state, {

            });
        default: return state;
    }
}