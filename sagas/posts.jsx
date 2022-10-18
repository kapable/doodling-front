import axios from 'axios';
import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import {
    LOAD_CATEGORIES_NEW_POSTS_REQUEST, LOAD_CATEGORIES_NEW_POSTS_SUCCESS, LOAD_CATEGORIES_NEW_POSTS_FAILURE,
    LOAD_CATEGORIES_NEW_15_POSTS_REQUEST, LOAD_CATEGORIES_NEW_15_POSTS_SUCCESS, LOAD_CATEGORIES_NEW_15_POSTS_FAILURE,
    LOAD_SUBCATEGORIES_NEW_POSTS_SUCCESS, LOAD_SUBCATEGORIES_NEW_POSTS_FAILURE, LOAD_SUBCATEGORIES_NEW_POSTS_REQUEST,
    LOAD_CATEGORY_EACH_SUBCATEGORY_NEW_POSTS_REQUEST, LOAD_CATEGORY_EACH_SUBCATEGORY_NEW_POSTS_SUCCESS, LOAD_CATEGORY_EACH_SUBCATEGORY_NEW_POSTS_FAILURE,
    LOAD_REALTIME_TOP_10_REQUEST, LOAD_REALTIME_TOP_10_SUCCESS, LOAD_REALTIME_TOP_10_FAILURE,
    LOAD_CATEGORY_REALTIME_TOP_5_REQUEST, LOAD_CATEGORY_REALTIME_TOP_5_SUCCESS, LOAD_CATEGORY_REALTIME_TOP_5_FAILURE,
    LOAD_SUBCATEGORY_REALTIME_TOP_5_REQUEST, LOAD_SUBCATEGORY_REALTIME_TOP_5_SUCCESS, LOAD_SUBCATEGORY_REALTIME_TOP_5_FAILURE,
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

function loadCategoryEachSubCategoryNewPostsAPI(data) {
    return axios.get(`/posts/${data}/new5SubCategoryPosts`);
};

function* loadCategoryEachSubCategoryNewPosts(action) {
    try {
        const result = yield call(loadCategoryEachSubCategoryNewPostsAPI, action.data);
        yield put({
            type: LOAD_CATEGORY_EACH_SUBCATEGORY_NEW_POSTS_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: LOAD_CATEGORY_EACH_SUBCATEGORY_NEW_POSTS_FAILURE,
            error: err.response
        });
    };
};

function loadRealtimeTop10API() {
    return axios.get(`/posts/top10RealTime`);
};

function* loadRealtimeTop10() {
    try {
        const result = yield call(loadRealtimeTop10API);
        yield put({
            type: LOAD_REALTIME_TOP_10_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: LOAD_REALTIME_TOP_10_FAILURE,
            error: err.response
        });
    };
};

function loadCategoryRealtimeTop5API(data) {
    return axios.get(`/posts/${data}/top5CategoryRealTime`);
};

function* loadCategoryRealtimeTop5(action) {
    try {
        const result = yield call(loadCategoryRealtimeTop5API, action.data);
        yield put({
            type: LOAD_CATEGORY_REALTIME_TOP_5_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: LOAD_CATEGORY_REALTIME_TOP_5_FAILURE,
            error: err.response
        });
    };
};

function loadSubCategoryRealtimeTop5API(data) {
    return axios.get(`/posts/${data}/top5SubCategoryRealTime`);
};

function* loadSubCategoryRealtimeTop5(action) {
    try {
        const result = yield call(loadSubCategoryRealtimeTop5API, action.data);
        yield put({
            type: LOAD_SUBCATEGORY_REALTIME_TOP_5_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: LOAD_SUBCATEGORY_REALTIME_TOP_5_FAILURE,
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
function* watchLoadCategoryEachSubCategoryNewPosts() {
    yield takeLatest(LOAD_CATEGORY_EACH_SUBCATEGORY_NEW_POSTS_REQUEST, loadCategoryEachSubCategoryNewPosts);
};
function* watchLoadRealtimeTop10() {
    yield takeLatest(LOAD_REALTIME_TOP_10_REQUEST, loadRealtimeTop10);
};
function* watchLoadCategoryRealtimeTop5() {
    yield takeLatest(LOAD_CATEGORY_REALTIME_TOP_5_REQUEST, loadCategoryRealtimeTop5);
};
function* watchLoadSubCategoryRealtimeTop5() {
    yield takeLatest(LOAD_SUBCATEGORY_REALTIME_TOP_5_REQUEST, loadSubCategoryRealtimeTop5);
};

export default function* postsSaga() {
    yield all([
        fork(watchLoadCategoriesNewPosts),
        fork(watchLoadCategoriesNew15Posts),
        fork(watchLoadSubCategoriesNewPosts),
        fork(watchLoadCategoryEachSubCategoryNewPosts),
        fork(watchLoadRealtimeTop10),
        fork(watchLoadCategoryRealtimeTop5),
        fork(watchLoadSubCategoryRealtimeTop5),
    ]);
};