import axios from 'axios';
import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import {
    // LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE,
} from '../reducers/category';

// function uploadImagesAPI(data) {
//     return axios.post(`/post/images`, data);
// };

// function* uploadImages(action) {
//     try {
//         const result = yield call(uploadImagesAPI, action.data);
//         yield put({
//             type: UPLOAD_IMAGES_SUCCESS,
//             data: result.data,
//         });
//     } catch (err) {
//         console.log(err);
//         yield put({
//             type: UPLOAD_IMAGES_FAILURE,
//             error: err.response.data
//         });
//     };
// };

// function* watchUploadImages() {
//     yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
// };

export default function* postSaga() {
    yield all([
        // fork(watchLoadPosts),
    ]);
};