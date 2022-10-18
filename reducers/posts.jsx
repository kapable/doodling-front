import produce from '../util/produce';

export const initialState = {
    topPosts: [],
    categoryNewPosts: [],
    categoryNew15Posts: [],
    subCategoryNewPosts: [],
    eachSubCategoryNewPosts: [],
    realtimeTop10Posts: [],
    categoryRealtimeTop5Posts: [],
    subCategoryRealtimeTop5Posts: [],
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
    loadRealtimeTop10Loading: false,
    loadRealtimeTop10Done: false,
    loadRealtimeTop10Error: false,
    loadCategoryRealtimeTop5Loading: false,
    loadCategoryRealtimeTop5Done: false,
    loadCategoryRealtimeTop5Error: false,
    loadSubCategoryRealtimeTop5Loading: false,
    loadSubCategoryRealtimeTop5Done: false,
    loadSubCategoryRealtimeTop5Error: false,
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

export const LOAD_REALTIME_TOP_10_REQUEST = 'LOAD_REALTIME_TOP_10_REQUEST';
export const LOAD_REALTIME_TOP_10_SUCCESS = 'LOAD_REALTIME_TOP_10_SUCCESS';
export const LOAD_REALTIME_TOP_10_FAILURE = 'LOAD_REALTIME_TOP_10_FAILURE';

export const LOAD_CATEGORY_REALTIME_TOP_5_REQUEST = 'LOAD_CATEGORY_REALTIME_TOP_5_REQUEST';
export const LOAD_CATEGORY_REALTIME_TOP_5_SUCCESS = 'LOAD_CATEGORY_REALTIME_TOP_5_SUCCESS';
export const LOAD_CATEGORY_REALTIME_TOP_5_FAILURE = 'LOAD_CATEGORY_REALTIME_TOP_5_FAILURE';

export const LOAD_SUBCATEGORY_REALTIME_TOP_5_REQUEST = 'LOAD_SUBCATEGORY_REALTIME_TOP_5_REQUEST';
export const LOAD_SUBCATEGORY_REALTIME_TOP_5_SUCCESS = 'LOAD_SUBCATEGORY_REALTIME_TOP_5_SUCCESS';
export const LOAD_SUBCATEGORY_REALTIME_TOP_5_FAILURE = 'LOAD_SUBCATEGORY_REALTIME_TOP_5_FAILURE';

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
            case LOAD_REALTIME_TOP_10_REQUEST:
                draft.loadRealtimeTop10Loading = true;
                draft.loadRealtimeTop10Done = false;
                draft.loadRealtimeTop10Error = null;
                break;
            case LOAD_REALTIME_TOP_10_SUCCESS:
                draft.loadRealtimeTop10Loading = false;
                draft.loadRealtimeTop10Done = true;
                draft.realtimeTop10Posts = action.data;
                break;
            case LOAD_REALTIME_TOP_10_FAILURE:
                draft.loadRealtimeTop10Loading = false;
                draft.loadRealtimeTop10Error = action.error;
                break;
            case LOAD_CATEGORY_REALTIME_TOP_5_REQUEST:
                draft.loadCategoryRealtimeTop5Loading = true;
                draft.loadCategoryRealtimeTop5Done = false;
                draft.loadCategoryRealtimeTop5Error = null;
                break;
            case LOAD_CATEGORY_REALTIME_TOP_5_SUCCESS:
                draft.loadCategoryRealtimeTop5Loading = false;
                draft.loadCategoryRealtimeTop5Done = true;
                draft.categoryRealtimeTop5Posts = action.data;
                break;
            case LOAD_CATEGORY_REALTIME_TOP_5_FAILURE:
                draft.loadCategoryRealtimeTop5Loading = false;
                draft.loadCategoryRealtimeTop5Error = action.error;
                break;
            case LOAD_SUBCATEGORY_REALTIME_TOP_5_REQUEST:
                draft.loadSubCategoryRealtimeTop5Loading = true;
                draft.loadSubCategoryRealtimeTop5Done = false;
                draft.loadSubCategoryRealtimeTop5Error = null;
                break;
            case LOAD_SUBCATEGORY_REALTIME_TOP_5_SUCCESS:
                draft.loadSubCategoryRealtimeTop5Loading = false;
                draft.loadSubCategoryRealtimeTop5Done = true;
                draft.subCategoryRealtimeTop5Posts = action.data;
                break;
            case LOAD_SUBCATEGORY_REALTIME_TOP_5_FAILURE:
                draft.loadSubCategoryRealtimeTop5Loading = false;
                draft.loadSubCategoryRealtimeTop5Error = action.error;
                break;
            default:
                break;
        };
    });
};

export default reducer;