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
    addReCommentLoading: false,
    addReCommentDone: false,
    addReCommentError: false,
    likeCommentLoading: false,
    likeCommentDone: false,
    likeCommentError: false,
    unLikeCommentLoading: false,
    unLikeCommentDone: false,
    unLikeCommentError: false,
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const EDIT_POST_REQUEST = 'EDIT_POST_REQUEST';
export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS';
export const EDIT_POST_FAILURE = 'EDIT_POST_FAILURE';

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

export const ADD_RECOMMENT_REQUEST = 'ADD_RECOMMENT_REQUEST';
export const ADD_RECOMMENT_SUCCESS = 'ADD_RECOMMENT_SUCCESS';
export const ADD_RECOMMENT_FAILURE = 'ADD_RECOMMENT_FAILURE';

export const LIKE_COMMENT_REQUEST = 'LIKE_COMMENT_REQUEST';
export const LIKE_COMMENT_SUCCESS = 'LIKE_COMMENT_SUCCESS';
export const LIKE_COMMENT_FAILURE = 'LIKE_COMMENT_FAILURE';

export const UNLIKE_COMMENT_REQUEST = 'UNLIKE_COMMENT_REQUEST';
export const UNLIKE_COMMENT_SUCCESS = 'UNLIKE_COMMENT_SUCCESS';
export const UNLIKE_COMMENT_FAILURE = 'UNLIKE_COMMENT_FAILURE';

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
                action.data.unshift(draft.singlePost.Comments);
                draft.addCommentDone = true;
                draft.addCommentLoading = false;
                break;
            case ADD_COMMENT_FAILURE:
                draft.addCommentLoading = false;
                draft.addCommentError = action.error;
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
                console.log(action.data)
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
            default:
                break;
        };
    });
};

export default reducer;