import axios from 'axios';
import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import {
    ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
    EDIT_POST_REQUEST, EDIT_POST_SUCCESS, EDIT_POST_FAILURE,
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
    REMOVE_COMMENT_REQUEST, REMOVE_COMMENT_SUCCESS, REMOVE_COMMENT_FAILURE,
    LOAD_COMMENTS_REQUEST, LOAD_COMMENTS_SUCCESS, LOAD_COMMENTS_FAILURE,
    ADD_RECOMMENT_REQUEST, ADD_RECOMMENT_SUCCESS, ADD_RECOMMENT_FAILURE,
    REMOVE_RECOMMENT_REQUEST, REMOVE_RECOMMENT_SUCCESS, REMOVE_RECOMMENT_FAILURE,
    REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE,
    REVIVE_POST_REQUEST, REVIVE_POST_SUCCESS, REVIVE_POST_FAILURE,
    UPLOAD_IMAGES_SUCCESS, UPLOAD_IMAGES_FAILURE, UPLOAD_IMAGES_REQUEST,
    LOAD_POST_REQUEST, LOAD_POST_SUCCESS, LOAD_POST_FAILURE,
    LIKE_POST_REQUEST, LIKE_POST_SUCCESS, LIKE_POST_FAILURE,
    LIKE_COMMENT_REQUEST, LIKE_COMMENT_SUCCESS, LIKE_COMMENT_FAILURE,
    UNLIKE_POST_REQUEST, UNLIKE_POST_SUCCESS, UNLIKE_POST_FAILURE,
    UNLIKE_COMMENT_REQUEST, UNLIKE_COMMENT_SUCCESS, UNLIKE_COMMENT_FAILURE,
    VIEW_POST_REQUEST, VIEW_POST_SUCCESS, VIEW_POST_FAILURE,
    ENABLE_POST_REQUEST, ENABLE_POST_SUCCESS, ENABLE_POST_FAILURE,
    CHECK_IS_MY_POST_REQUEST, CHECK_IS_MY_POST_SUCCESS, CHECK_IS_MY_POST_FAILURE,
} from '../reducers/post';
import { ADD_POST_LIKE_TO_ME, REMOVE_POST_LIKE_TO_ME, ADD_COMMENT_LIKE_TO_ME, REMOVE_COMMENT_LIKE_TO_ME } from '../reducers/user';

function addPostAPI(data) {
    return axios.post(`/post`, data);
};

function* addPost(action) {
    try {
        const result = yield call(addPostAPI, action.data);
        yield put({
            type: ADD_POST_SUCCESS,
            data: result.data,
        });
        // yield put({
        //     type: ADD_POST_TO_ME,
        //     data: result.data.id,
        // })
    } catch (err) {
        console.log(err);
        yield put({
            type: ADD_POST_FAILURE,
            error: err.response.data
        });
    };
};

function editPostAPI(data) {
    return axios.patch(`/post/${data.postId}`, data);
};

function* editPost(action) {
    try {
        const result = yield call(editPostAPI, action.data);
        yield put({
            type: EDIT_POST_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: EDIT_POST_FAILURE,
            error: err.response.data
        });
    };
};

function removePostAPI(data) {
    return axios.delete(`/post/${data.postId}/remove`);
};

function* removePost(action) {
    try {
        const result = yield call(removePostAPI, action.data);
        yield put({
            type: REMOVE_POST_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: REMOVE_POST_FAILURE,
            error: err.response.data
        });
    };
};

function revivePostAPI(data) {
    return axios.patch(`/post/${data.postId}/revive`);
};

function* revivePost(action) {
    try {
        const result = yield call(revivePostAPI, action.data);
        yield put({
            type: REVIVE_POST_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: REVIVE_POST_FAILURE,
            error: err.response.data
        });
    };
};

function uploadImagesAPI(data) {
    return axios.post(`/post/images`, data);
};

function* uploadImages(action) {
    try {
        const result = yield call(uploadImagesAPI, action.data);
        yield put({
            type: UPLOAD_IMAGES_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: UPLOAD_IMAGES_FAILURE,
            error: err.response.data
        });
    };
};

function loadPostAPI(data) {
    return axios.get(`/post/${data}`);
}

function* loadPost(action) {
    try {
        const result = yield call(loadPostAPI, action.data);
        yield put({
            type: LOAD_POST_SUCCESS,
            data: result.data,
        })
    } catch (err) {
        console.log(err)
        yield put({
            type: LOAD_POST_FAILURE,
            error: err.response
        })
    };
};

function likePostAPI(data) {
    return axios.patch(`/post/${data.postId}/like`, data);
}

function* likePost(action) {
    try {
        const result = yield call(likePostAPI, action.data);
        yield put({
            type: LIKE_POST_SUCCESS,
            data: result.data,
        });
        yield put({
            type: ADD_POST_LIKE_TO_ME,
            data: result.data,
        });
    } catch (err) {
        console.log(err)
        yield put({
            type: LIKE_POST_FAILURE,
            error: err.response
        })
    };
};

function likeCommentAPI(data) {
    return axios.patch(`/comment/${data.commentId}/like`);
}

function* likeComment(action) {
    try {
        const result = yield call(likeCommentAPI, action.data);
        yield put({
            type: LIKE_COMMENT_SUCCESS,
            data: result.data,
        });
        yield put({
            type: ADD_COMMENT_LIKE_TO_ME,
            data: result.data,
        });
    } catch (err) {
        console.log(err)
        yield put({
            type: LIKE_COMMENT_FAILURE,
            error: err.response
        })
    };
};

function unLikePostAPI(data) {
    return axios.delete(`/post/${data.postId}/like`, data);
}

function* unLikePost(action) {
    try {
        const result = yield call(unLikePostAPI, action.data);
        yield put({
            type: UNLIKE_POST_SUCCESS,
            data: result.data,
        });
        yield put({
            type: REMOVE_POST_LIKE_TO_ME,
            data: result.data,
        });
    } catch (err) {
        console.log(err)
        yield put({
            type: UNLIKE_POST_FAILURE,
            error: err.response
        })
    };
};

function unLikeCommentAPI(data) {
    return axios.delete(`/comment/${data.commentId}/like`);
}

function* unLikeComment(action) {
    try {
        const result = yield call(unLikeCommentAPI, action.data);
        yield put({
            type: UNLIKE_COMMENT_SUCCESS,
            data: result.data,
        });
        yield put({
            type: REMOVE_COMMENT_LIKE_TO_ME,
            data: result.data,
        });
    } catch (err) {
        console.log(err)
        yield put({
            type: UNLIKE_COMMENT_FAILURE,
            error: err.response
        })
    };
};

function viewPostAPI(data) {
    return axios.patch(`/post/${data.postId}/view`, data);
}

function* viewPost(action) {
    try {
        yield call(viewPostAPI, action.data);
        yield put({
            type: VIEW_POST_SUCCESS,
        });
    } catch (err) {
        console.log(err)
        yield put({
            type: VIEW_POST_FAILURE,
            error: err.response
        })
    };
};

function enablePostAPI(data) {
    return axios.patch(`/post/${data.postId}/enable`, data);
}

function* enablePost(action) {
    try {
        const result = yield call(enablePostAPI, action.data);
        yield put({
            type: ENABLE_POST_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.log(err)
        yield put({
            type: ENABLE_POST_FAILURE,
            error: err.response
        })
    };
};

function addCommentAPI(data) {
    return axios.post(`/post/${data.postId}/comment`, data);
}

function* addComment(action) {
    try {
        const result = yield call(addCommentAPI, action.data);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.log(err)
        yield put({
            type: ADD_COMMENT_FAILURE,
            error: err.response
        })
    };
};

function removeCommentAPI(data) {
    return axios.delete(`/comment/${data.commentId}`);
}

function* removeComment(action) {
    try {
        const result = yield call(removeCommentAPI, action.data);
        yield put({
            type: REMOVE_COMMENT_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.log(err)
        yield put({
            type: REMOVE_COMMENT_FAILURE,
            error: err.response
        })
    };
};

function loadCommentsAPI(data) {
    return axios.get(`/comment/${data.postId}?lastId=${data.lastId}`);
}

function* loadComments(action) {
    try {
        const result = yield call(loadCommentsAPI, action.data);
        yield put({
            type: LOAD_COMMENTS_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.log(err)
        yield put({
            type: LOAD_COMMENTS_FAILURE,
            error: err.response
        })
    };
};

function addReCommentAPI(data) {
    return axios.post(`/comment/${data.commentId}/reComment`, data);
}

function* addReComment(action) {
    try {
        const result = yield call(addReCommentAPI, action.data);
        yield put({
            type: ADD_RECOMMENT_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.log(err)
        yield put({
            type: ADD_RECOMMENT_FAILURE,
            error: err.response
        })
    };
};

function removeReCommentAPI(data) {
    return axios.delete(`/comment/${data.commentId}/reComment/${data.reCommentId}`);
}

function* removeReComment(action) {
    try {
        const result = yield call(removeReCommentAPI, action.data);
        yield put({
            type: REMOVE_RECOMMENT_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.log(err)
        yield put({
            type: REMOVE_RECOMMENT_FAILURE,
            error: err.response
        })
    };
};

function checkIsMyPostAPI(data) {
    return axios.post(`/post/${data.postId}/checkMine`);
}

function* checkIsMyPost(action) {
    try {
        const result = yield call(checkIsMyPostAPI, action.data);
        yield put({
            type: CHECK_IS_MY_POST_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.log(err)
        yield put({
            type: CHECK_IS_MY_POST_FAILURE,
            error: err.response
        })
    };
};

function* watchUploadImages() {
    yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
};
function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
};
function* watchEditPost() {
    yield takeLatest(EDIT_POST_REQUEST, editPost);
};
function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost);
};
function* watchRevivePost() {
    yield takeLatest(REVIVE_POST_REQUEST, revivePost);
};
function* watchLoadPost() {
    yield takeLatest(LOAD_POST_REQUEST, loadPost);
};
function* watchLikePost() {
    yield takeLatest(LIKE_POST_REQUEST, likePost);
};
function* watchLikeComment() {
    yield takeLatest(LIKE_COMMENT_REQUEST, likeComment);
};
function* watchUnLikePost() {
    yield takeLatest(UNLIKE_POST_REQUEST, unLikePost);
};
function* watchUnLikeComment() {
    yield takeLatest(UNLIKE_COMMENT_REQUEST, unLikeComment);
};
function* watchViewPost() {
    yield takeLatest(VIEW_POST_REQUEST, viewPost);
};
function* watchEnablePost() {
    yield takeLatest(ENABLE_POST_REQUEST, enablePost);
};
function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
};
function* watchRemoveComment() {
    yield takeLatest(REMOVE_COMMENT_REQUEST, removeComment);
};
function* watchLoadComments() {
    yield takeLatest(LOAD_COMMENTS_REQUEST, loadComments);
};
function* watchAddReComment() {
    yield takeLatest(ADD_RECOMMENT_REQUEST, addReComment);
};
function* watchRemoveReComment() {
    yield takeLatest(REMOVE_RECOMMENT_REQUEST, removeReComment);
};
function* watchCheckIsMyPost() {
    yield takeLatest(CHECK_IS_MY_POST_REQUEST, checkIsMyPost);
};

export default function* postSaga() {
    yield all([
        fork(watchLoadPost),
        fork(watchAddPost),
        fork(watchEditPost),
        fork(watchRemovePost),
        fork(watchRevivePost),
        fork(watchAddComment),
        fork(watchRemoveComment),
        fork(watchLoadComments),
        fork(watchAddReComment),
        fork(watchRemoveReComment),
        fork(watchUploadImages),
        fork(watchLikePost),
        fork(watchLikeComment),
        fork(watchUnLikePost),
        fork(watchUnLikeComment),
        fork(watchViewPost),
        fork(watchEnablePost),
        fork(watchCheckIsMyPost),
    ]);
};