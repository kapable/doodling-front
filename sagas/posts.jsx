import axios from 'axios';
import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import {
    LOAD_CATEGORIES_NEW_POSTS_REQUEST, LOAD_CATEGORIES_NEW_POSTS_SUCCESS, LOAD_CATEGORIES_NEW_POSTS_FAILURE,
    LOAD_CATEGORIES_NEW_15_POSTS_REQUEST, LOAD_CATEGORIES_NEW_15_POSTS_SUCCESS, LOAD_CATEGORIES_NEW_15_POSTS_FAILURE,
    LOAD_SUBCATEGORIES_NEW_POSTS_SUCCESS, LOAD_SUBCATEGORIES_NEW_POSTS_FAILURE, LOAD_SUBCATEGORIES_NEW_POSTS_REQUEST,
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

function loadCategoriesNew15PostsAPI(data) {
    return axios.get(`/posts/${data.theme}/new15Category?lastId=${data.lastId}`);
};

function* loadCategoriesNew15Posts(action) {
    try {
        const result = yield call(loadCategoriesNew15PostsAPI, action.data);
        yield put({
            type: LOAD_CATEGORIES_NEW_15_POSTS_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: LOAD_CATEGORIES_NEW_15_POSTS_FAILURE,
            error: err.response
        });
    };
};

function loadSubCategoriesNewPostsAPI(data) {
    return axios.get(`/posts/${data.subTheme}/new15SubCategory?lastId=${data.lastId}`);
};

function* loadSubCategoriesNewPosts(action) {
    try {
        const result = yield call(loadSubCategoriesNewPostsAPI, action.data);
        yield put({
            type: LOAD_SUBCATEGORIES_NEW_POSTS_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: LOAD_SUBCATEGORIES_NEW_POSTS_FAILURE,
            error: err.response
        });
    };
};


function* watchLoadCategoriesNewPosts() {
    yield takeLatest(LOAD_CATEGORIES_NEW_POSTS_REQUEST, loadCategoriesNewPosts);
};
function* watchLoadCategoriesNew15Posts() {
    yield takeLatest(LOAD_CATEGORIES_NEW_15_POSTS_REQUEST, loadCategoriesNew15Posts);
};
function* watchLoadSubCategoriesNewPosts() {
    yield takeLatest(LOAD_SUBCATEGORIES_NEW_POSTS_REQUEST, loadSubCategoriesNewPosts);
};

export default function* postsSaga() {
    yield all([
        fork(watchLoadCategoriesNewPosts),
        fork(watchLoadCategoriesNew15Posts),
        fork(watchLoadSubCategoriesNewPosts),
    ]);
};