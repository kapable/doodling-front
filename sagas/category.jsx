import axios from 'axios';
import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import {
    ADD_CATEGORY_SUCCESS, ADD_CATEGORY_FAILURE, ADD_CATEGORY_REQUEST,
    ADD_SUBCATEGORY_SUCCESS, ADD_SUBCATEGORY_FAILURE, ADD_SUBCATEGORY_REQUEST,
    SET_CATEGORY_ENABLE_REQUEST, SET_CATEGORY_ENABLE_FAILURE, SET_CATEGORY_ENABLE_SUCCESS,
    SET_SUBCATEGORY_ENABLE_REQUEST, SET_SUBCATEGORY_ENABLE_FAILURE, SET_SUBCATEGORY_ENABLE_SUCCESS,
    LOAD_CATEGORIES_REQUEST, LOAD_CATEGORIES_SUCCESS, LOAD_CATEGORIES_FAILURE,
} from '../reducers/category';

function addCategoryAPI(data) {
    return axios.post(`/category`, data);
};

function* addCategory(action) {
    try {
        const result = yield call(addCategoryAPI, action.data);
        yield put({
            type: ADD_CATEGORY_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: ADD_CATEGORY_FAILURE,
            error: err.response
        });
    };
};

function addSubCategoryAPI(data) {
    return axios.post(`/category/${data.categoryId}`, data);
};

function* addSubCategory(action) {
    try {
        const result = yield call(addSubCategoryAPI, action.data);
        yield put({
            type: ADD_SUBCATEGORY_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: ADD_SUBCATEGORY_FAILURE,
            error: err.response
        });
    };
};

function addSetCategoryEnableAPI(data) {
    return axios.patch(`/category/${data.categoryId}/enable`, data);
};

function* addSetCategoryEnable(action) {
    try {
        const result = yield call(addSetCategoryEnableAPI, action.data);
        yield put({
            type: SET_CATEGORY_ENABLE_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: SET_CATEGORY_ENABLE_FAILURE,
            error: err.response
        });
    };
};

function addSetSubCategoryEnableAPI(data) {
    return axios.patch(`/category/${data.subCategoryId}/subEnable`, data);
};

function* addSetSubCategoryEnable(action) {
    try {
        const result = yield call(addSetSubCategoryEnableAPI, action.data);
        yield put({
            type: SET_SUBCATEGORY_ENABLE_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: SET_SUBCATEGORY_ENABLE_FAILURE,
            error: err.response
        });
    };
};

function loadCategoriesAPI() {
    return axios.get(`/category`);
};

function* loadCategories() {
    try {
        const result = yield call(loadCategoriesAPI);
        yield put({
            type: LOAD_CATEGORIES_SUCCESS,
            data: result.data,
        })
    } catch (err) {
        console.log(err);
        yield put({
            type: LOAD_CATEGORIES_FAILURE,
            error: err.response.data
        })
    };
};


function* watchAddCategory() {
    yield takeLatest(ADD_CATEGORY_REQUEST, addCategory);
};
function* watchAddSubCategory() {
    yield takeLatest(ADD_SUBCATEGORY_REQUEST, addSubCategory);
};
function* watchSetCategoryEnable() {
    yield takeLatest(SET_CATEGORY_ENABLE_REQUEST, addSetCategoryEnable);
};
function* watchSetSubCategoryEnable() {
    yield takeLatest(SET_SUBCATEGORY_ENABLE_REQUEST, addSetSubCategoryEnable);
};
function* watchLoadCategories() {
    yield takeLatest(LOAD_CATEGORIES_REQUEST, loadCategories);
};

export default function* categorySaga() {
    yield all([
        fork(watchAddCategory),
        fork(watchAddSubCategory),
        fork(watchSetCategoryEnable),
        fork(watchSetSubCategoryEnable),
        fork(watchLoadCategories),
    ]);
};