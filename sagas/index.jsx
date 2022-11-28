import { all, fork } from 'redux-saga/effects';
import userSaga from './user';
import postSaga from './post';
import postsSaga from './posts';
import categorySaga from './category';
import reportSaga from './report';
import axios from 'axios';
import { backUrl } from '../config/config';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
    yield all([
        fork(userSaga),
        fork(postSaga),
        fork(postsSaga),
        fork(categorySaga),
        fork(reportSaga),
    ]);
};