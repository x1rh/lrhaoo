import {
    FETCH_PROTECTED_DATA_REQUEST,
    RECEIVE_PROTECTED_DATA
} from "../constants/constants";

import {logoutAndRedirect} from "./auth";

import axios from 'axios';


export function fetchProtectedDataRequest(){
    return {
        type: FETCH_PROTECTED_DATA_REQUEST
    };
}

export function fetchProtectedData(token) {
    return (dispatch) => {
        dispatch(fetchProtectedDataRequest());
        axios.get('/api/user', {            // todo: url need to be fixed
            headers: {
                'Authorization': token
            }
        }).then(response => response.data).then(response => {
            dispatch(receiveProtectedData(response.result));
        }).catch(err => {
            if(err.status === 401){
                dispatch(logoutAndRedirect());            // todo: wrong logic
            }
        })
    }
}

export function receiveProtectedData(data) {
    return {
        type: RECEIVE_PROTECTED_DATA,
        payload: {
            data
        }
    }
}