import axios from 'axios';
import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import {
    LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
    LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
    SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
    FOLLOW_REQUEST ,FOLLOW_SUCCESS ,FOLLOW_FAILURE,
    UNFOLLOW_REQUEST ,UNFOLLOW_SUCCESS ,UNFOLLOW_FAILURE,
    LOAD_MY_INFO_REQUEST, LOAD_MY_INFO_SUCCESS, LOAD_MY_INFO_FAILURE,
    LOAD_USER_INFO_REQUEST, LOAD_USER_INFO_SUCCESS, LOAD_USER_INFO_FAILURE,
    CHANGE_NICKNAME_AND_MBTI_REQUEST, CHANGE_NICKNAME_AND_MBTI_SUCCESS, CHANGE_NICKNAME_AND_MBTI_FAILURE,
    CHANGE_DESCRIPTION_REQUEST, CHANGE_DESCRIPTION_SUCCESS, CHANGE_DESCRIPTION_FAILURE,
    CHECK_NICKNAME_DOUBLED_REQUEST, CHECK_NICKNAME_DOUBLED_SUCCESS, CHECK_NICKNAME_DOUBLED_FAILURE,
    CHECK_EMAIL_DOUBLED_REQUEST, CHECK_EMAIL_DOUBLED_SUCCESS, CHECK_EMAIL_DOUBLED_FAILURE,
    CHECK_IS_FOLLOWING_REQUEST, CHECK_IS_FOLLOWING_SUCCESS, CHECK_IS_FOLLOWING_FAILURE,
    LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWERS_SUCCESS, LOAD_FOLLOWERS_FAILURE,
    LOAD_FOLLOWINGS_REQUEST, LOAD_FOLLOWINGS_SUCCESS, LOAD_FOLLOWINGS_FAILURE,
    SET_USER_ADMIN_REQUEST, SET_USER_ADMIN_SUCCESS, SET_USER_ADMIN_FAILURE,
    SET_USER_ENABLE_REQUEST, SET_USER_ENABLE_SUCCESS, SET_USER_ENABLE_FAILURE,
} from '../reducers/user';

function logInAPI(data) {
    return axios.post(`/user/login`, data);
};

function* logIn(action) {
    try {
        const result = yield call(logInAPI, action.data);
        yield put({
            type: LOG_IN_SUCCESS,
            data: result.data
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: LOG_IN_FAILURE,
            error: err.response.data
        });
    };
};

function logOutAPI() {
    return axios.post(`/user/logout`);
};

function* logOut() {
    try {
        yield call(logOutAPI);
        yield put({
            type: LOG_OUT_SUCCESS,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: LOG_OUT_FAILURE,
            error: err.response.data
        });
    };
};

function signUpAPI(data) {
    return axios.post(`/user`, data);
};

function* signUp(action) {
    try {
        yield call(signUpAPI, action.data);
        yield put({
            type: SIGN_UP_SUCCESS,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: SIGN_UP_FAILURE,
            error: err.response.data
        });
    };
};

function loadMyInfoAPI() {
    return axios.get(`/user`);
};

function* loadMyInfo() {
    try {
        const result = yield call(loadMyInfoAPI);
        yield put({
            type: LOAD_MY_INFO_SUCCESS,
            data: result?.data || null
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: LOAD_MY_INFO_FAILURE,
            error: err.response.data
        });
    };
};

function loadUserInfoAPI(data) {
    return axios.get(`/user/${encodeURIComponent(data)}`);
};

function* loadUserInfo(action) {
    try {
        const result = yield call(loadUserInfoAPI, action.data);
        yield put({
            type: LOAD_USER_INFO_SUCCESS,
            data: result?.data || null
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: LOAD_USER_INFO_FAILURE,
            error: err.response.data
        });
    };
};

function changeNicknameAndMbtiAPI(data) {
    return axios.patch(`/user/userInfo/`, data);
};

function* changeNicknameAndMbti(action) {
    try {
        const result = yield call(changeNicknameAndMbtiAPI, action.data);
        yield put({
            type: CHANGE_NICKNAME_AND_MBTI_SUCCESS,
            data: result?.data || null
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: CHANGE_NICKNAME_AND_MBTI_FAILURE,
            error: err.response.data
        });
    };
};

function changeDescriptionAPI(data) {
    return axios.patch(`/user/description/`, data);
};

function* changeDescription(action) {
    try {
        const result = yield call(changeDescriptionAPI, action.data);
        yield put({
            type: CHANGE_DESCRIPTION_SUCCESS,
            data: result?.data || null
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: CHANGE_DESCRIPTION_FAILURE,
            error: err.response.data
        });
    };
};

function checkNicknameDoubledAPI(data) {
    return axios.post(`/user/nicknameCheck`, encodeURIComponent(data.nickname));
};

function* checkNicknameDoubled(action) {
    try {
        const result = yield call(checkNicknameDoubledAPI, action.data);
        yield put({
            type: CHECK_NICKNAME_DOUBLED_SUCCESS,
            data: result?.data || null
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: CHECK_NICKNAME_DOUBLED_FAILURE,
            error: err.response.data
        });
    };
};

function checkEmailDoubledAPI(data) {
    return axios.post(`/user/emailCheck`, data);
};

function* checkEmailDoubled(action) {
    try {
        const result = yield call(checkEmailDoubledAPI, action.data);
        yield put({
            type: CHECK_EMAIL_DOUBLED_SUCCESS,
            data: result?.data || null
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: CHECK_EMAIL_DOUBLED_FAILURE,
            error: err.response.data
        });
    };
};

function checkIsFollowingAPI(data) {
    return axios.post(`/user/isFollowing`, data);
};

function* checkIsFollowing(action) {
    try {
        const result = yield call(checkIsFollowingAPI, action.data);
        yield put({
            type: CHECK_IS_FOLLOWING_SUCCESS,
            data: result?.data || null
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: CHECK_IS_FOLLOWING_FAILURE,
            error: err.response.data
        });
    };
};

function loadFollowersAPI(data) {
    return axios.get(`/user/${encodeURIComponent(data.userNickname)}/followers?lastId=${data.lastId}`);
};

function* loadFollowers(action) {
    try {
        const result = yield call(loadFollowersAPI, action.data);
        yield put({
            type: LOAD_FOLLOWERS_SUCCESS,
            data: result?.data || null
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: LOAD_FOLLOWERS_FAILURE,
            error: err.response.data
        });
    };
};

function loadFollowingsAPI(data) {
    return axios.get(`/user/${encodeURIComponent(data.userNickname)}/followings?lastId=${data.lastId}`);
};

function* loadFollowings(action) {
    try {
        const result = yield call(loadFollowingsAPI, action.data);
        yield put({
            type: LOAD_FOLLOWINGS_SUCCESS,
            data: result?.data || null
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: LOAD_FOLLOWINGS_FAILURE,
            error: err.response.data
        });
    };
};

function followAPI(data) {
    return axios.patch(`/user/${data}/follow`);
};

function* follow(action) {
    try {
        const result = yield call(followAPI, action.data);
        yield put({
            type: FOLLOW_SUCCESS,
            data: result?.data || null
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: FOLLOW_FAILURE,
            error: err.response.data
        });
    };
};

function unFollowAPI(data) {
    return axios.delete(`/user/${data}/unfollow`);
};

function* unFollow(action) {
    try {
        const result = yield call(unFollowAPI, action.data);
        yield put({
            type: UNFOLLOW_SUCCESS,
            data: result?.data || null
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: UNFOLLOW_FAILURE,
            error: err.response.data
        });
    };
};

function setUserAdminAPI(data) {
    return axios.patch(`/user/${data.userId}/admin`, data);
};

function* setUserAdmin(action) {
    try {
        const result = yield call(setUserAdminAPI, action.data);
        yield put({
            type: SET_USER_ADMIN_SUCCESS,
            data: result?.data || null
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: SET_USER_ADMIN_FAILURE,
            error: err.response.data
        });
    };
};

function setUserEnableAPI(data) {
    return axios.patch(`/user/${data.userId}/enable`, data);
};

function* setUserEnable(action) {
    try {
        const result = yield call(setUserEnableAPI, action.data);
        yield put({
            type: SET_USER_ENABLE_SUCCESS,
            data: result?.data || null
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: SET_USER_ENABLE_FAILURE,
            error: err.response.data
        });
    };
};

function* watchLogin() {
    yield takeLatest(LOG_IN_REQUEST, logIn)
};
function* watchLogout() {
    yield takeLatest(LOG_OUT_REQUEST, logOut)
};
function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp)
};
function* watchLoadMyInfo() {
    yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo)
};
function* watchLoadUserInfo() {
    yield takeLatest(LOAD_USER_INFO_REQUEST, loadUserInfo)
};
function* watchChangeNicknameAndMbti() {
    yield takeLatest(CHANGE_NICKNAME_AND_MBTI_REQUEST, changeNicknameAndMbti)
};
function* watchChangeDescription() {
    yield takeLatest(CHANGE_DESCRIPTION_REQUEST, changeDescription)
};
function* watchCheckNicknameDoubled() {
    yield takeLatest(CHECK_NICKNAME_DOUBLED_REQUEST, checkNicknameDoubled)
};
function* watchCheckEmailDoubled() {
    yield takeLatest(CHECK_EMAIL_DOUBLED_REQUEST, checkEmailDoubled)
};
function* watchLoadFollowers() {
    yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers)
};
function* watchLoadFollowings() {
    yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings)
};
function* watchIsFollowing() {
    yield takeLatest(CHECK_IS_FOLLOWING_REQUEST, checkIsFollowing)
};
function* watchFollow() {
    yield takeLatest(FOLLOW_REQUEST, follow)
};
function* watchUnFollow() {
    yield takeLatest(UNFOLLOW_REQUEST, unFollow)
};
function* watchSetUserAdmin() {
    yield takeLatest(SET_USER_ADMIN_REQUEST, setUserAdmin)
};
function* watchSetUserEnable() {
    yield takeLatest(SET_USER_ENABLE_REQUEST, setUserEnable)
};

export default function* userSaga() {
    yield all([
        fork(watchLogin),
        fork(watchLogout),
        fork(watchSignUp),
        fork(watchFollow),
        fork(watchUnFollow),
        fork(watchLoadMyInfo),
        fork(watchLoadUserInfo),
        fork(watchChangeNicknameAndMbti),
        fork(watchChangeDescription),
        fork(watchCheckNicknameDoubled),
        fork(watchCheckEmailDoubled),
        fork(watchIsFollowing),
        fork(watchLoadFollowers),
        fork(watchLoadFollowings),
        fork(watchSetUserAdmin),
        fork(watchSetUserEnable),
    ]);
};