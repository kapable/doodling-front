import produce from '../util/produce';

export const initialState = {
    topPosts: [],
    categoryNewPosts: [],
    categoryNew15Posts: [],
};

export const LOAD_CATEGORIES_NEW_POSTS_REQUEST = 'LOAD_CATEGORIES_NEW_POSTS_REQUEST';
export const LOAD_CATEGORIES_NEW_POSTS_SUCCESS = 'LOAD_CATEGORIES_NEW_POSTS_SUCCESS';
export const LOAD_CATEGORIES_NEW_POSTS_FAILURE = 'LOAD_CATEGORIES_NEW_POSTS_FAILURE';

export const LOAD_CATEGORIES_NEW_15_POSTS_REQUEST = 'LOAD_CATEGORIES_NEW_15_POSTS_REQUEST';
export const LOAD_CATEGORIES_NEW_15_POSTS_SUCCESS = 'LOAD_CATEGORIES_NEW_15_POSTS_SUCCESS';
export const LOAD_CATEGORIES_NEW_15_POSTS_FAILURE = 'LOAD_CATEGORIES_NEW_15_POSTS_FAILURE';

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
            case LOAD_CATEGORIES_NEW_15_POSTS_REQUEST:
                draft.loadCategoriesNew15PostsLoading = true;
                draft.loadCategoriesNew15PostsDone = false;
                draft.loadCategoriesNew15PostsError = null;
                break;
            case LOAD_CATEGORIES_NEW_15_POSTS_SUCCESS:
                draft.loadCategoriesNew15PostsLoading = false;
                draft.loadCategoriesNew15PostsDone = true;
                draft.categoryNew15Posts = action.data;
                break;
            case LOAD_CATEGORIES_NEW_15_POSTS_FAILURE:
                draft.loadCategoriesNew15PostsLoading = false;
                draft.loadCategoriesNew15PostsError = action.error;
                break;
            default:
                break;
        };
    });
};

export default reducer;