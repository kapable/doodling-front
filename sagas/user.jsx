import axios from 'axios';
import { all, fork, put, takeLatest, call, delay } from 'redux-saga/effects';
import {
    // LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
    // LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
    // SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
    // CHANGE_NICKNAME_REQUEST, CHANGE_NICKNAME_SUCCESS, CHANGE_NICKNAME_FAILURE,
    // CHANGE_DESCRIPTION_REQUEST, CHANGE_DESCRIPTION_SUCCESS, CHANGE_DESCRIPTION_FAILURE,
    // FOLLOW_REQUEST ,FOLLOW_SUCCESS ,FOLLOW_FAILURE,
    // UNFOLLOW_REQUEST ,UNFOLLOW_SUCCESS ,UNFOLLOW_FAILURE,
    // // LOAD_MY_INFO_REQUEST, LOAD_MY_INFO_SUCCESS, LOAD_MY_INFO_FAILURE,
    // LOAD_USER_INFO_REQUEST, LOAD_USER_INFO_SUCCESS, LOAD_USER_INFO_FAILURE,
    // LOAD_FOLLOWER_LIST_REQUEST, LOAD_FOLLOWER_LIST_SUCCESS, LOAD_FOLLOWER_LIST_FAILURE,
    // LOAD_FOLLOWING_LIST_REQUEST, LOAD_FOLLOWING_LIST_SUCCESS, LOAD_FOLLOWING_LIST_FAILURE,
} from '../reducers/user';

export default function* userSaga() {
    yield all([
        // fork(watchLogin),
        // fork(watchLogout),
        // fork(watchSignUp),
        // fork(watchChangeNickname),
        // fork(watchChangeDescription),
        // fork(watchFollow),
        // fork(watchUnfollow),
        // fork(watchLoadMyInfo),
        // fork(watchLoadUserInfo),
        // fork(watchLoadFollowerList),
        // fork(watchLoadFollowingList),
    ])
};