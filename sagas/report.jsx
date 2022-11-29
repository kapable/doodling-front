import axios from 'axios';
import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import {
    ADD_REPORT_LABEL_SUCCESS, ADD_REPORT_LABEL_FAILURE, ADD_REPORT_LABEL_REQUEST,
    REPORT_ARTICLE_SUCCESS, REPORT_ARTICLE_FAILURE, REPORT_ARTICLE_REQUEST,
    GET_REPORTED_ARTICLES_SUCCESS, GET_REPORTED_ARTICLES_FAILURE, GET_REPORTED_ARTICLES_REQUEST,
    GET_REPORT_LABELS_SUCCESS, GET_REPORT_LABELS_FAILURE, GET_REPORT_LABELS_REQUEST,
} from '../reducers/report';

function addReportLabelAPI(data) {
    return axios.post(`/report`, data);
};

function* addReportLabel(action) {
    try {
        const result = yield call(addReportLabelAPI, action.data);
        yield put({
            type: ADD_REPORT_LABEL_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: ADD_REPORT_LABEL_FAILURE,
            error: err.response
        });
    };
};

function reportArticleAPI(data) {
    return axios.post(`/report/${data.postId}`, data);
};

function* reportArticle(action) {
    try {
        const result = yield call(reportArticleAPI, action.data);
        yield put({
            type: REPORT_ARTICLE_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: REPORT_ARTICLE_FAILURE,
            error: err.response
        });
    };
};

function getReportedArticlesAPI(data) {
    return axios.get(`/report?lastId=${data.lastId}`);
};

function* getReportedArticles(action) {
    try {
        const result = yield call(getReportedArticlesAPI, action.data);
        yield put({
            type: GET_REPORTED_ARTICLES_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: GET_REPORTED_ARTICLES_FAILURE,
            error: err.response
        });
    };
};

function getReportLabelsAPI(data) {
    return axios.get(`/report/labels`);
};

function* getReportLabels(action) {
    try {
        const result = yield call(getReportLabelsAPI, action.data);
        yield put({
            type: GET_REPORT_LABELS_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: GET_REPORT_LABELS_FAILURE,
            error: err.response
        });
    };
};

function* watchAddReportLabel() {
    yield takeLatest(ADD_REPORT_LABEL_REQUEST, addReportLabel);
};
function* watchReportArticle() {
    yield takeLatest(REPORT_ARTICLE_REQUEST, reportArticle);
};
function* watchGetReportedArticles() {
    yield takeLatest(GET_REPORTED_ARTICLES_REQUEST, getReportedArticles);
};
function* watchGetReportLabels() {
    yield takeLatest(GET_REPORT_LABELS_REQUEST, getReportLabels);
};

export default function* reportSaga() {
    yield all([
        fork(watchAddReportLabel),
        fork(watchReportArticle),
        fork(watchGetReportedArticles),
        fork(watchGetReportLabels),
    ]);
};