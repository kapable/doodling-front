import produce from '../util/produce';

export const initialState = {
    singlePost: {},
    uploadedPost: {},
    imagePaths: [],
    addPostLoading: false,
    addPostDone: false,
    addPostError: false,
    editPostLoading: false,
    editPostDone: false,
    editPostError: false,
    removePostLoading: false,
    removePostDone: false,
    removePostError: false,
    revivePostLoading: false,
    revivePostDone: false,
    revivePostError: false,
    uploadImagesLoading: false,
    uploadImagesDone: false,
    uploadImagesError: false,
    loadPostLoading: false,
    loadPostDone: false,
    loadPostError: false,
    likePostLoading: false,
    likePostDone: false,
    likePostError: false,
    unLikePostLoading: false,
    unLikePostDone: false,
    unLikePostError: false,
    viewPostLoading: false,
    viewPostDone: false,
    viewPostError: false,
    enablePostLoading: false,
    enablePostDone: false,
    enablePostError: false,
    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: false,
    loadCommentsLoading: false,
    loadCommentsDone: false,
    loadCommentsError: false,
    addReCommentLoading: false,
    addReCommentDone: false,
    addReCommentError: false,
    likeCommentLoading: false,
    likeCommentDone: false,
    likeCommentError: false,
    unLikeCommentLoading: false,
    unLikeCommentDone: false,
    unLikeCommentError: false,
    checkIsMyPostLoading: false,
    checkIsMyPostDone: false,
    checkIsMyPostError: false,
    hasMoreComments: false,
    isMyPost: false,
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const EDIT_POST_REQUEST = 'EDIT_POST_REQUEST';
export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS';
export const EDIT_POST_FAILURE = 'EDIT_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const REVIVE_POST_REQUEST = 'REVIVE_POST_REQUEST';
export const REVIVE_POST_SUCCESS = 'REVIVE_POST_SUCCESS';
export const REVIVE_POST_FAILURE = 'REVIVE_POST_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const VIEW_POST_REQUEST = 'VIEW_POST_REQUEST';
export const VIEW_POST_SUCCESS = 'VIEW_POST_SUCCESS';
export const VIEW_POST_FAILURE = 'VIEW_POST_FAILURE';

export const ENABLE_POST_REQUEST = 'ENABLE_POST_REQUEST';
export const ENABLE_POST_SUCCESS = 'ENABLE_POST_SUCCESS';
export const ENABLE_POST_FAILURE = 'ENABLE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const LOAD_COMMENTS_REQUEST = 'LOAD_COMMENTS_REQUEST';
export const LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS';
export const LOAD_COMMENTS_FAILURE = 'LOAD_COMMENTS_FAILURE';

export const ADD_RECOMMENT_REQUEST = 'ADD_RECOMMENT_REQUEST';
export const ADD_RECOMMENT_SUCCESS = 'ADD_RECOMMENT_SUCCESS';
export const ADD_RECOMMENT_FAILURE = 'ADD_RECOMMENT_FAILURE';

export const LIKE_COMMENT_REQUEST = 'LIKE_COMMENT_REQUEST';
export const LIKE_COMMENT_SUCCESS = 'LIKE_COMMENT_SUCCESS';
export const LIKE_COMMENT_FAILURE = 'LIKE_COMMENT_FAILURE';

export const UNLIKE_COMMENT_REQUEST = 'UNLIKE_COMMENT_REQUEST';
export const UNLIKE_COMMENT_SUCCESS = 'UNLIKE_COMMENT_SUCCESS';
export const UNLIKE_COMMENT_FAILURE = 'UNLIKE_COMMENT_FAILURE';

export const CHECK_IS_MY_POST_REQUEST = 'CHECK_IS_MY_POST_REQUEST';
export const CHECK_IS_MY_POST_SUCCESS = 'CHECK_IS_MY_POST_SUCCESS';
export const CHECK_IS_MY_POST_FAILURE = 'CHECK_IS_MY_POST_FAILURE';

export const INVALIDATE_UPLOADED_POST = 'INVALIDATE_UPLOADED_POST';

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case ADD_POST_REQUEST:
                draft.addPostLoading = true;
                draft.addPostDone = false;
                draft.addPostError = null;
                break;
            case ADD_POST_SUCCESS:
                draft.uploadedPost = action.data;
                draft.addPostDone = true;
                draft.addPostLoading = false;
                break;
            case ADD_POST_FAILURE:
                draft.addPostLoading = false;
                draft.addPostError = action.error;
                break;
            case EDIT_POST_REQUEST:
                draft.editPostLoading = true;
                draft.editPostDone = false;
                draft.editPostError = null;
                break;
            case EDIT_POST_SUCCESS:
                draft.uploadedPost = action.data;
                draft.editPostDone = true;
                draft.editPostLoading = false;
                break;
            case EDIT_POST_FAILURE:
                draft.editPostLoading = false;
                draft.editPostError = action.error;
                break;
            case REMOVE_POST_REQUEST:
                draft.removePostLoading = true;
                draft.removePostDone = false;
                draft.removePostError = null;
                break;
            case REMOVE_POST_SUCCESS:
                draft.removePostDone = true;
                draft.removePostLoading = false;
                break;
            case REMOVE_POST_FAILURE:
                draft.removePostLoading = false;
                draft.removePostError = action.error;
                break;
            case REVIVE_POST_REQUEST:
                draft.revivePostLoading = true;
                draft.revivePostDone = false;
                draft.revivePostError = null;
                break;
            case REVIVE_POST_SUCCESS:
                draft.revivePostDone = true;
                draft.revivePostLoading = false;
                break;
            case REVIVE_POST_FAILURE:
                draft.revivePostLoading = false;
                draft.revivePostError = action.error;
                break;
            case UPLOAD_IMAGES_REQUEST:
                draft.uploadImagesLoading = true;
                draft.uploadImagesDone = false;
                draft.uploadImagesError = null;
                break;
            case UPLOAD_IMAGES_SUCCESS:
                draft.imagePaths = draft.imagePaths.concat(action.data);
                draft.uploadImagesDone = true;
                draft.uploadImagesLoading = false;
                break;
            case UPLOAD_IMAGES_FAILURE:
                draft.uploadImagesLoading = false;
                draft.uploadImagesError = action.error;
                break;
            case LOAD_POST_REQUEST:
                draft.loadPostLoading = true;
                draft.loadPostDone = false;
                draft.loadPostError = null;
                break;
            case LOAD_POST_SUCCESS:
                draft.singlePost = action.data;
                draft.loadPostDone = true;
                draft.loadPostLoading = false;
                draft.hasMoreComments = action.data.Comments.length === 10;
                break;
            case LOAD_POST_FAILURE:
                draft.loadPostLoading = false;
                draft.loadPostError = action.error;
                break;
            case LIKE_POST_REQUEST:
                draft.likePostLoading = true;
                draft.likePostDone = false;
                draft.likePostError = null;
                break;
            case LIKE_POST_SUCCESS:
                draft.singlePost.PostLikers = draft.singlePost.PostLikers + 1;
                draft.likePostDone = true;
                draft.likePostLoading = false;
                break;
            case LIKE_POST_FAILURE:
                draft.likePostLoading = false;
                draft.likePostError = action.error;
                break;
            case UNLIKE_POST_REQUEST:
                draft.unLikePostLoading = true;
                draft.unLikePostDone = false;
                draft.unLikePostError = null;
                break;
            case UNLIKE_POST_SUCCESS:
                draft.singlePost.PostLikers = draft.singlePost.PostLikers - 1;
                draft.unLikePostDone = true;
                draft.unLikePostLoading = false;
                break;
            case UNLIKE_POST_FAILURE:
                draft.unLikePostLoading = false;
                draft.unLikePostError = action.error;
                break;
            case VIEW_POST_REQUEST:
                draft.viewPostLoading = true;
                draft.viewPostDone = false;
                draft.viewPostError = null;
                break;
            case VIEW_POST_SUCCESS:
                draft.viewPostDone = true;
                draft.viewPostLoading = false;
                break;
            case VIEW_POST_FAILURE:
                draft.viewPostLoading = false;
                draft.viewPostError = action.error;
                break;
            case ENABLE_POST_REQUEST:
                draft.enablePostLoading = true;
                draft.enablePostDone = false;
                draft.enablePostError = null;
                break;
            case ENABLE_POST_SUCCESS:
                draft.singlePost = action.data;
                draft.enablePostDone = true;
                draft.enablePostLoading = false;
                break;
            case ENABLE_POST_FAILURE:
                draft.enablePostLoading = false;
                draft.enablePostError = action.error;
                break;
            case ADD_COMMENT_REQUEST:
                draft.addCommentLoading = true;
                draft.addCommentDone = false;
                draft.addCommentError = null;
                break;
            case ADD_COMMENT_SUCCESS:
                draft.singlePost.Comments.unshift(action.data);
                draft.addCommentDone = true;
                draft.addCommentLoading = false;
                break;
            case ADD_COMMENT_FAILURE:
                draft.addCommentLoading = false;
                draft.addCommentError = action.error;
                break;
            case LOAD_COMMENTS_REQUEST:
                draft.loadCommentsLoading = true;
                draft.loadCommentsDone = false;
                draft.loadCommentsError = null;
                break;
            case LOAD_COMMENTS_SUCCESS:
                draft.singlePost.Comments = draft.singlePost.Comments.concat(action.data);
                draft.loadCommentsDone = true;
                draft.loadCommentsLoading = false;
                draft.hasMoreComments = action.data.length === 10;
                break;
            case LOAD_COMMENTS_FAILURE:
                draft.loadCommentsLoading = false;
                draft.loadCommentsError = action.error;
                break;
            case ADD_RECOMMENT_REQUEST:
                draft.addReCommentLoading = true;
                draft.addReCommentDone = false;
                draft.addReCommentError = null;
                break;
            case ADD_RECOMMENT_SUCCESS:
                // action.data.unshift(draft.singlePost.Comments.find((comment) => comment.id === action.data.ReCommentId).ReComment);
                draft.addReCommentDone = true;
                draft.addReCommentLoading = false;
                break;
            case ADD_RECOMMENT_FAILURE:
                draft.addReCommentLoading = false;
                draft.addReCommentError = action.error;
                break;
            case LIKE_COMMENT_REQUEST:
                draft.likeCommentLoading = true;
                draft.likeCommentDone = false;
                draft.likeCommentError = null;
                break;
            case LIKE_COMMENT_SUCCESS:
                draft.singlePost.Comments.find((c) => c.id === action.data.id).CommentLikers = action.data.likers;
                draft.likeCommentDone = true;
                draft.likeCommentLoading = false;
                break;
            case LIKE_COMMENT_FAILURE:
                draft.likeCommentLoading = false;
                draft.likeCommentError = action.error;
                break;
            case UNLIKE_COMMENT_REQUEST:
                draft.unLikeCommentLoading = true;
                draft.unLikeCommentDone = false;
                draft.unLikeCommentError = null;
                break;
            case UNLIKE_COMMENT_SUCCESS:
                draft.singlePost.Comments.find((c) => c.id === action.data.id).CommentLikers = action.data.likers;
                draft.unLikeCommentDone = true;
                draft.unLikeCommentLoading = false;
                break;
            case UNLIKE_COMMENT_FAILURE:
                draft.unLikeCommentLoading = false;
                draft.unLikeCommentError = action.error;
                break;
            case CHECK_IS_MY_POST_REQUEST:
                draft.checkIsMyPostLoading = true;
                draft.checkIsMyPostDone = false;
                draft.checkIsMyPostError = null;
                break;
            case CHECK_IS_MY_POST_SUCCESS:
                draft.isMyPost = action.data.isMine;
                draft.checkIsMyPostDone = true;
                draft.checkIsMyPostLoading = false;
                break;
            case CHECK_IS_MY_POST_FAILURE:
                draft.checkIsMyPostLoading = false;
                draft.checkIsMyPostError = action.error;
                break;
            case INVALIDATE_UPLOADED_POST:
                draft.uploadedPost = {}
                draft.addPostLoading = false;
                draft.addPostDone = false;
                draft.addPostError = false;
                break;
            default:
                break;
        };
    });
};

export default reducer;