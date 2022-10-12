import axios from 'axios';
import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import {
    LOAD_CATEGORIES_NEW_POSTS_REQUEST, LOAD_CATEGORIES_NEW_POSTS_SUCCESS, LOAD_CATEGORIES_NEW_POSTS_FAILURE
} from '../reducers/posts';

function loadCategoriesNewPostsAPI() {
    return axios.get(`/posts/new5Categories`);
};

function* loadCategoriesNewPosts() {
    try {
        const result = yield call(loadCategoriesNewPostsAPI);
        yield put({
            type: LOAD_CATEGORIES_NEW_POSTS_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: LOAD_CATEGORIES_NEW_POSTS_FAILURE,
            error: err.response
        });
    };
};


function* watchLoadCategoriesNewPosts() {
    yield takeLatest(LOAD_CATEGORIES_NEW_POSTS_REQUEST, loadCategoriesNewPosts);
};

export default function* postsSaga() {
    yield all([
        fork(watchLoadCategoriesNewPosts),
    ]);
};