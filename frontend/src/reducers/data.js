import {
    FETCH_ARTICLE_LIST_REQUEST,
    FETCH_ARTICLE_LIST_SUCCESS,
    FETCH_ARTICLE_LIST_FAILURE,

    FETCH_COMMENT_LIST_REQUEST,
    FETCH_COMMENT_LIST_SUCCESS,
    FETCH_COMMENT_LIST_FAILURE,

    FETCH_ARTICLE_REQUEST,
    FETCH_ARTICLE_SUCCESS,
    FETCH_ARTICLE_FAILURE,

    POST_COMMENT_REQUEST,
    POST_COMMENT_SUCCESS,
    POST_COMMENT_FAILURE,

    FETCH_REPLY_LIST_REQUEST,
    FETCH_REPLY_LIST_SUCCESS,
    FETCH_REPLY_LIST_FAILURE,

    POST_REPLY_REQUEST,
    POST_REPLY_SUCCESS,
    POST_REPLY_FAILURE, FETCH_TAG_LIST_REQUEST, FETCH_TAG_LIST_SUCCESS, FETCH_TAG_LIST_FAILURE,
} from "../constants/constants";

const initialState = {
    page: 1,
    perPage: 3,
    total: 1,

    article: null,
    articles: null,
    comments: null,
    replies: null,
    tags: null,

    isFetching: false,
    isSubmitting: false,
    loaded: false
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
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
                total: action.payload.total,
                articles: action.payload.articles,
            });
        case FETCH_ARTICLE_LIST_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                loaded: false
            });
        case FETCH_COMMENT_LIST_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                loaded: false
            });
        case FETCH_COMMENT_LIST_SUCCESS:
            return Object.assign({}, state, {
                page: action.payload.page,
                perPage: action.payload.perPage,
                total: action.payload.total,
                comments: action.payload.comments,
            });
        case FETCH_COMMENT_LIST_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                loaded: false
            });
        case FETCH_ARTICLE_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                loaded: false
            });
        case FETCH_ARTICLE_SUCCESS:
            return Object.assign({}, state, {
                page: action.payload.page,
                perPage: action.payload.perPage,
                total: action.payload.total,
                article: action.payload.article,
                comments: action.payload.comments
            });
        case FETCH_ARTICLE_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                loaded: false
            });
        case POST_COMMENT_REQUEST:
            return Object.assign({}, state, {
                isSubmitting: true
            });
        case POST_COMMENT_SUCCESS:
            return Object.assign({}, state, {
                isSubmitting: false,
            });
        case POST_COMMENT_FAILURE:
            return Object.assign({}, state, {
                isSubmitting: false,
            });
        case FETCH_REPLY_LIST_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case FETCH_REPLY_LIST_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                replies: action.payload.replies
            });
        case FETCH_REPLY_LIST_FAILURE:
            return Object.assign({}, state, {
                isFetching: false
            });
        case POST_REPLY_REQUEST:
            return Object.assign({}, state, {
                isSubmitting: true
            });
        case POST_REPLY_SUCCESS:
            return Object.assign({}, state, {
                isSubmitting: false
            });
        case POST_REPLY_FAILURE:
            return Object.assign({}, state, {
                isSubmitting: false
            });
        case FETCH_TAG_LIST_REQUEST:
            return Object.assign({}, state, {});
        case FETCH_TAG_LIST_SUCCESS:
            return Object.assign({}, state, {
                tags: action.payload.tags
            });
        case FETCH_TAG_LIST_FAILURE:
            return Object.assign({}, state, {});
        default:
            return state;
    }
}