import {
    FETCH_PROTECTED_DATA_REQUEST,
    RECEIVE_PROTECTED_DATA
} from "../constants/constants";

const initialState = {
    data: null,
    isFetching: false,
    loaded: false
};

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case FETCH_PROTECTED_DATA_REQUEST:
            return Object.assign({}, state, {

            });
        case RECEIVE_PROTECTED_DATA:
            return Object.assign({}, state, {

            });
        default: return state;
    }
}