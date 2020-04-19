import {
    FETCH_PROTECTED_DATA_REQUEST,
    RECEIVE_PROTECTED_DATA,
    FETCH_ARTICLE_LIST_REQUEST,
    FETCH_ARTICLE_LIST_SUCCESS,
    FETCH_ARTICLE_LIST_FAILURE,
} from "../constants/constants";

const initialState = {
    page: 1,
    perPage: 3,
    articleTotal: 1,
    articles: null,
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
        case FETCH_ARTICLE_LIST_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                loaded: false
            });
        case FETCH_ARTICLE_LIST_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                loaded: true,
                page: action.payload.page,
                perPage: action.payload.perPage,
                articleTotal: action.payload.articleTotal,
                articles: action.payload.articles,
            });
        case FETCH_ARTICLE_LIST_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                loaded: false
            });
        default: return state;
    }
}