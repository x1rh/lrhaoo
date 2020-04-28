import {
    FETCH_PROTECTED_DATA_REQUEST,
    RECEIVE_PROTECTED_DATA,
    FETCH_ARTICLE_LIST_REQUEST,
    FETCH_ARTICLE_LIST_SUCCESS,
    FETCH_ARTICLE_LIST_FAILURE,
    FETCH_COMMENT_LIST_REQUEST,
    FETCH_COMMENT_LIST_SUCCESS,
    FETCH_COMMENT_LIST_FAILURE
} from "../constants/constants";

import {logoutAndRedirect} from "./auth";

import axios from 'axios';


export function fetchProtectedDataRequest() {
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
            if (err.status === 401) {
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

export function fetchArticleListRequest() {
    return {
        type: FETCH_ARTICLE_LIST_REQUEST
    }
}

export function fetchArticleListSuccess(page, perPage, articleTotal, articles) {

    return {
        type: FETCH_ARTICLE_LIST_SUCCESS,
        payload: {
            page,
            perPage,
            articleTotal,
            articles
        }
    }
}

export function fetchArticleListFailure(err) {
    return {
        type: FETCH_ARTICLE_LIST_FAILURE,
        payload: {
            status: err.status,
            statusText: err.statusText
        }
    }
}

export function fetchArticleList(page = 1) {
    return function (dispatch) {
        dispatch(fetchArticleListRequest());
        return axios.get('/api/article_paginate_by_default/' + page)
            .then(response => response.data)
            .then(response => {
                try {
                    dispatch(fetchArticleListSuccess(
                        response.page,
                        response.per_page,
                        response.total,
                        response.articles
                    ));
                } catch (err) {
                    dispatch(fetchArticleListFailure(err));
                }
            }).catch(err => {
                dispatch(fetchArticleListFailure(err));
            })
    }
}

export function fetchCommentListRequest() {
    return {
        type: FETCH_COMMENT_LIST_REQUEST
    }
}

export function fetchCommentListSuccess(page, perPage, articleTotal, comments) {
    return {
        type: FETCH_COMMENT_LIST_SUCCESS,
        payload: {
            page,
            perPage,
            articleTotal,
            comments
        }
    }
}

export function fetchCommentListFailure(err) {
    return {
        type: FETCH_COMMENT_LIST_FAILURE,
        err: err
    }
}

export function fetchCommentList(article_id, page) {
    return function (dispatch) {
        dispatch(fetchCommentListRequest());
        return axios.get('/api/comment_paginate/' + article_id + '/' + page)
            .then(response => response.data)
            .then(response => {
                try {
                    dispatch(fetchCommentListSuccess(
                        response.page,
                        response.per_page,
                        response.total,
                        response.comments
                    ));
                } catch (err) {
                    dispatch(fetchCommentListFailure(err));
                }
            }).catch(err => {
                dispatch(fetchCommentListFailure(err));
            })
    }
}