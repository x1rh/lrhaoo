import {
    FETCH_PROTECTED_DATA_REQUEST,
    RECEIVE_PROTECTED_DATA,

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
    FETCH_REPLY_LIST_FAILURE
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

export function fetchArticleListSuccess(page, perPage, total, articles) {

    return {
        type: FETCH_ARTICLE_LIST_SUCCESS,
        payload: {
            page,
            perPage,
            total,
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

export function fetchCommentListSuccess(page, perPage, total, comments) {
    return {
        type: FETCH_COMMENT_LIST_SUCCESS,
        payload: {
            page,
            perPage,
            total,
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

export function fetchArticleRequest() {
    return {
        type: FETCH_ARTICLE_REQUEST
    }
}

export function fetchArticleSuccess(page, perPage, total, article, comments) {
    return {
        type: FETCH_ARTICLE_SUCCESS,
        payload: {
            page,
            perPage,
            total,
            article,
            comments
        }
    }
}

export function fetchArticleFailure(err) {
    return {
        type: FETCH_ARTICLE_FAILURE,
        err: err
    }
}

export function fetchArticle(article_id) {
    return function (dispatch) {
        dispatch(fetchArticleRequest());
        return axios.get('/api/article/'+article_id)
            .then(response => response.data)
            .then(response => {
                try{
                    console.log(response);
                    dispatch(fetchArticleSuccess(
                        response.page,
                        response.per_page,
                        response.total,
                        response.article,
                        response.comments
                    ));
                }catch (err) {
                    dispatch(fetchArticleFailure(err));
                }
            }).catch(err => {
                dispatch(fetchArticleFailure(err));
            })
    }
}

export function postCommentRequest() {
    return {
        type: POST_COMMENT_REQUEST
    }
}

export function postCommentSuccess(data) {
    return {
        type: POST_COMMENT_SUCCESS,
        payload:{
            data
        }
    }
}

export function postCommentFailure(err) {
    return {
        type: POST_COMMENT_FAILURE,
        err: err
    }
}

export function postComment(article_id, uid, comment) {
    return function (dispatch) {
        dispatch(postCommentRequest());
        const accessToken = localStorage.getItem('accessToken');
        let formData = new FormData();
        formData.append('article_id', article_id);
        formData.append('uid', uid);
        formData.append('comment', comment);
        return axios({
            method: 'post',
            url: '/api/make_a_comment',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
            data:formData
        }).then(response => response.data)
            .then(response => {
                try {
                    console.log(response);
                    dispatch(postCommentSuccess(response));
                }catch (err) {
                    dispatch(postCommentFailure(err));
                }
            }).catch(err => {
                dispatch(postCommentFailure(err));
            })
    }
}

export function fetchReplyListRequest() {
    return {
        type: FETCH_REPLY_LIST_REQUEST
    }
}

export function fetchReplyListSuccess(replies) {
    return {
        type: FETCH_REPLY_LIST_SUCCESS,
        payload: {
            replies: replies
        }
    }
}

export function fetchReplyListFailure(err) {
    return {
        type: FETCH_REPLY_LIST_FAILURE,
        err: err
    }
}

export function fetchReplyList(commentID) {
    return function (dispatch) {
        dispatch(fetchReplyListRequest());
        const accessToken = localStorage.getItem('accessToken');
        return axios({
            method: 'get',
            url: '/api/get_reply_list/'+commentID,
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            }
        }).then(response => response.data)
            .then(response => {
                try {
                    console.log(response.replies);
                    dispatch(fetchReplyListSuccess(response.replies));
                }catch (err) {
                    dispatch(fetchReplyListFailure(err));
                }
            }).catch(err => {
                dispatch(fetchReplyListFailure(err));
            })
    }
}