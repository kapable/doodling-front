import produce from '../util/produce';

export const initialState = {
    topPosts: [],
    categoryNewPosts: [],
};

export const LOAD_CATEGORIES_NEW_POSTS_REQUEST = 'LOAD_CATEGORIES_NEW_POSTS_REQUEST';
export const LOAD_CATEGORIES_NEW_POSTS_SUCCESS = 'LOAD_CATEGORIES_NEW_POSTS_SUCCESS';
export const LOAD_CATEGORIES_NEW_POSTS_FAILURE = 'LOAD_CATEGORIES_NEW_POSTS_FAILURE';

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case LOAD_CATEGORIES_NEW_POSTS_REQUEST:
                draft.loadCategoriesNewPostsLoading = true;
                draft.loadCategoriesNewPostsDone = false;
                draft.loadCategoriesNewPostsError = null;
                break;
            case LOAD_CATEGORIES_NEW_POSTS_SUCCESS:
                draft.loadCategoriesNewPostsLoading = false;
                draft.loadCategoriesNewPostsDone = true;
                draft.categoryNewPosts = action.data;
                break;
            case LOAD_CATEGORIES_NEW_POSTS_FAILURE:
                draft.loadCategoriesNewPostsLoading = false;
                draft.loadCategoriesNewPostsError = action.error;
                break;
            default:
                break;
        };
    });
};

export default reducer;