import axios from 'axios';
import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import {
    // LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE,
    ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
    // ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
    // REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE,
    UPLOAD_IMAGES_SUCCESS, UPLOAD_IMAGES_FAILURE, UPLOAD_IMAGES_REQUEST,
    // UPLOAD_THUMBNAIL_SUCCESS, UPLOAD_THUMBNAIL_FAILURE, UPLOAD_THUMBNAIL_REQUEST,
    LOAD_POST_REQUEST, LOAD_POST_SUCCESS, LOAD_POST_FAILURE,
    // SET_POST_TITLE_REQUEST, SET_POST_TITLE_SUCCESS, SET_POST_TITLE_FAILURE,
    // SET_POST_TEXT_SUCCESS, SET_POST_TEXT_FAILURE, SET_POST_TEXT_REQUEST,
    LIKE_POST_REQUEST, LIKE_POST_SUCCESS, LIKE_POST_FAILURE,
    UNLIKE_POST_REQUEST, UNLIKE_POST_SUCCESS, UNLIKE_POST_FAILURE,
} from '../reducers/post';
import { ADD_POST_LIKE_TO_ME, REMOVE_POST_LIKE_TO_ME } from '../reducers/user';

function addPostAPI(data) {
    return axios.post(`/post`, data);
};

function* addPost(action) {
    try {
        const result = yield call(addPostAPI, action.data);
        yield put({
            type: ADD_POST_SUCCESS,
            data: result.data,
        });
        // yield put({
        //     type: ADD_POST_TO_ME,
        //     data: result.data.id,
        // })
    } catch (err) {
        console.log(err);
        yield put({
            type: ADD_POST_FAILURE,
            error: err.response.data
        });
    };
};

function uploadImagesAPI(data) {
    return axios.post(`/post/images`, data);
};

function* uploadImages(action) {
    try {
        const result = yield call(uploadImagesAPI, action.data);
        yield put({
            type: UPLOAD_IMAGES_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: UPLOAD_IMAGES_FAILURE,
            error: err.response.data
        });
    };
};

function loadPostAPI(data) {
    return axios.get(`/post/${data}`);
}

function* loadPost(action) {
    try {
        const result = yield call(loadPostAPI, action.data);
        yield put({
            type: LOAD_POST_SUCCESS,
            data: result.data,
        })
    } catch (err) {
        console.log(err)
        yield put({
            type: LOAD_POST_FAILURE,
            error: err.response
        })
    };
};

function likePostAPI(data) {
    return axios.patch(`/post/${data.postId}/like`, data);
}

function* likePost(action) {
    try {
        const result = yield call(likePostAPI, action.data);
        yield put({
            type: LIKE_POST_SUCCESS,
            data: result.data,
        });
        yield put({
            type: ADD_POST_LIKE_TO_ME,
            data: result.data,
        });
    } catch (err) {
        console.log(err)
        yield put({
            type: LIKE_POST_FAILURE,
            error: err.response
        })
    };
};

function unLikePostAPI(data) {
    return axios.delete(`/post/${data.postId}/like`, data);
}

function* unLikePost(action) {
    try {
        const result = yield call(unLikePostAPI, action.data);
        yield put({
            type: UNLIKE_POST_SUCCESS,
            data: result.data,
        });
        yield put({
            type: REMOVE_POST_LIKE_TO_ME,
            data: result.data,
        });
    } catch (err) {
        console.log(err)
        yield put({
            type: UNLIKE_POST_FAILURE,
            error: err.response
        })
    };
};

function* watchUploadImages() {
    yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
};
function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
};
function* watchLoadPost() {
    yield takeLatest(LOAD_POST_REQUEST, loadPost);
};
function* watchLikePost() {
    yield takeLatest(LIKE_POST_REQUEST, likePost);
};
function* watchUnLikePost() {
    yield takeLatest(UNLIKE_POST_REQUEST, unLikePost);
};

export default function* postSaga() {
    yield all([
        // fork(watchLoadPosts),
        fork(watchLoadPost),
        fork(watchAddPost),
        // fork(watchRemovePost),
        // fork(watchSetPostTitle),
        // fork(watchSetPostText),
        // fork(watchAddComment),
        fork(watchUploadImages),
        fork(watchLikePost),
        fork(watchUnLikePost),
    ]);
};