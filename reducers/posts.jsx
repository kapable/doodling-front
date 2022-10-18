import produce from '../util/produce';

export const initialState = {
    topPosts: [],
    categoryNewPosts: [],
    categoryNew15Posts: [],
    subCategoryNewPosts: [],
    eachSubCategoryNewPosts: [],
    loadCategoriesNewPostsLoading: false,
    loadCategoriesNewPostsDone: false,
    loadCategoriesNewPostsError: false,
    loadCategoriesNew15PostsLoading: false,
    loadCategoriesNew15PostsDone: false,
    loadCategoriesNew15PostsError: false,
    loadSubCategoriesNewPostsLoading: false,
    loadSubCategoriesNewPostsDone: false,
    loadSubCategoriesNewPostsError: false,
    loadCategoryEachSubcategoryNewPostsLoading: false,
    loadCategoryEachSubcategoryNewPostsDone: false,
    loadCategoryEachSubcategoryNewPostsError: false,
    hasMorePosts: false,
};

export const LOAD_CATEGORIES_NEW_POSTS_REQUEST = 'LOAD_CATEGORIES_NEW_POSTS_REQUEST';
export const LOAD_CATEGORIES_NEW_POSTS_SUCCESS = 'LOAD_CATEGORIES_NEW_POSTS_SUCCESS';
export const LOAD_CATEGORIES_NEW_POSTS_FAILURE = 'LOAD_CATEGORIES_NEW_POSTS_FAILURE';

export const LOAD_CATEGORIES_NEW_15_POSTS_REQUEST = 'LOAD_CATEGORIES_NEW_15_POSTS_REQUEST';
export const LOAD_CATEGORIES_NEW_15_POSTS_SUCCESS = 'LOAD_CATEGORIES_NEW_15_POSTS_SUCCESS';
export const LOAD_CATEGORIES_NEW_15_POSTS_FAILURE = 'LOAD_CATEGORIES_NEW_15_POSTS_FAILURE';

export const LOAD_SUBCATEGORIES_NEW_POSTS_REQUEST = 'LOAD_SUBCATEGORIES_NEW_POSTS_REQUEST';
export const LOAD_SUBCATEGORIES_NEW_POSTS_SUCCESS = 'LOAD_SUBCATEGORIES_NEW_POSTS_SUCCESS';
export const LOAD_SUBCATEGORIES_NEW_POSTS_FAILURE = 'LOAD_SUBCATEGORIES_NEW_POSTS_FAILURE';

export const LOAD_CATEGORY_EACH_SUBCATEGORY_NEW_POSTS_REQUEST = 'LOAD_CATEGORY_EACH_SUBCATEGORY_NEW_POSTS_REQUEST';
export const LOAD_CATEGORY_EACH_SUBCATEGORY_NEW_POSTS_SUCCESS = 'LOAD_CATEGORY_EACH_SUBCATEGORY_NEW_POSTS_SUCCESS';
export const LOAD_CATEGORY_EACH_SUBCATEGORY_NEW_POSTS_FAILURE = 'LOAD_CATEGORY_EACH_SUBCATEGORY_NEW_POSTS_FAILURE';

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
                draft.categoryNew15Posts = draft.categoryNew15Posts.concat(action.data);
                draft.hasMorePosts = action.data.length === 15;
                break;
            case LOAD_CATEGORIES_NEW_15_POSTS_FAILURE:
                draft.loadCategoriesNew15PostsLoading = false;
                draft.loadCategoriesNew15PostsError = action.error;
                break;
            case LOAD_SUBCATEGORIES_NEW_POSTS_REQUEST:
                draft.loadSubCategoriesNewPostsLoading = true;
                draft.loadSubCategoriesNewPostsDone = false;
                draft.loadSubCategoriesNewPostsError = null;
                break;
            case LOAD_SUBCATEGORIES_NEW_POSTS_SUCCESS:
                draft.loadSubCategoriesNewPostsLoading = false;
                draft.loadSubCategoriesNewPostsDone = true;
                draft.subCategoryNewPosts = draft.subCategoryNewPosts.concat(action.data);
                draft.hasMorePosts = action.data.length === 15;
                break;
            case LOAD_SUBCATEGORIES_NEW_POSTS_FAILURE:
                draft.loadSubCategoriesNewPostsLoading = false;
                draft.loadSubCategoriesNewPostsError = action.error;
                break;
            case LOAD_CATEGORY_EACH_SUBCATEGORY_NEW_POSTS_REQUEST:
                draft.loadCategoryEachSubcategoryNewPostsLoading = true;
                draft.loadCategoryEachSubcategoryNewPostssDone = false;
                draft.loadCategoryEachSubcategoryNewPostssError = null;
                break;
            case LOAD_CATEGORY_EACH_SUBCATEGORY_NEW_POSTS_SUCCESS:
                draft.loadCategoryEachSubcategoryNewPostsLoading = false;
                draft.loadCategoryEachSubcategoryNewPostssDone = true;
                draft.eachSubCategoryNewPosts = action.data;
                break;
            case LOAD_CATEGORY_EACH_SUBCATEGORY_NEW_POSTS_FAILURE:
                draft.loadCategoryEachSubcategoryNewPostsLoading = false;
                draft.loadCategoryEachSubcategoryNewPostssError = action.error;
                break;
            default:
                break;
        };
    });
};

export default reducer;