import axios from 'axios';
import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import {
    ADD_CATEGORY_SUCCESS, ADD_CATEGORY_FAILURE, ADD_CATEGORY_REQUEST,
} from '../reducers/category';

function addCategoryAPI(data) {
    return axios.post(`/category`, data);
};

function* addCategory(action) {
    console.log(action);
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

function* watchAddCategory() {
    yield takeLatest(ADD_CATEGORY_REQUEST, addCategory);
};

export default function* postSaga() {
    yield all([
        fork(watchAddCategory),
    ]);
};