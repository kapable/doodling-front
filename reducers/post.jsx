import produce from '../util/produce';

export const initialState = {
    singlePost: {},
    uploadedPost: {},
    imagePaths: [],
    addPostLoading: false,
    addPostDone: false,
    addPostError: false,
    uploadImagesLoading: false,
    uploadImagesDone: false,
    uploadImagesError: false,
    loadPostLoading: false,
    loadPostDone: false,
    loadPostError: false,
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

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
            default:
                break;
        };
    });
};

export default reducer;