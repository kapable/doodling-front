import produce from '../util/produce';

export const initialState = {
    categories: [
        // {
        //     "id": 0,
        //     "label": "홈",
        //     "domain": "main",
        //     "enabled": true,
        //     "order": 0,
        //     "SubCategories": []
        // },
        // {
        //     "id": 1,
        //     "label": "MBTI",
        //     "domain": "mbti",
        //     "enabled": true,
        //     "order": 1,
        //     "SubCategories": [
        //         {
        //             "id": 1,
        //             "label": "전체",
        //             "domain": "",
        //             "enabled": true,
        //             "order": 1,
        //             "CategoryId": 1
        //         },
        //         {
        //             "id": 2,
        //             "label": "연애&썸",
        //             "domain": "mbtiLoveAndSome",
        //             "enabled": true,
        //             "order": 2,
        //             "CategoryId": 1
        //         }
        //     ]
        // },
        // {
        //     "id": 3,
        //     "label": "TOP100",
        //     "domain": "top100",
        //     "enabled": true,
        //     "order": 2,
        //     "SubCategories": [
        //         {
        //             "id": 3,
        //             "label": "실시간",
        //             "domain": "",
        //             "enabled": true,
        //             "order": 3,
        //             "CategoryId": 3
        //         },
        //         {
        //             "id": 4,
        //             "label": "주간 ",
        //             "domain": "top100Weekly",
        //             "enabled": true,
        //             "order": 4,
        //             "CategoryId": 3
        //         },
        //         // {
        //         //     "id": 5,
        //         //     "label": "월간  ",
        //         //     "domain": "top100Monthly",
        //         //     "enabled": true,
        //         //     "order": 5,
        //         //     "CategoryId": 3
        //         // }
        //     ]
        // },
        // {
        //     "id": 2,
        //     "label": "이슈",
        //     "domain": "issue",
        //     "enabled": true,
        //     "order": 3,
        //     "SubCategories": [
        //         {
        //             "id": 6,
        //             "label": "전체",
        //             "domain": "",
        //             "enabled": true,
        //             "order": 6,
        //             "CategoryId": 2
        //         },
        //     ]
        // }
    ],
    addCategoryLoading: false,
    addCategoryDone: false,
    addCategoryError: false,
    addSubCategoryLoading: false,
    addSubCategoryDone: false,
    addSubCategoryError: false,
    setCategoryEnableLoading: false,
    setCategoryEnableDone: false,
    setCategoryEnableError: false,
    setSubCategoryEnableLoading: false,
    setSubCategoryEnableDone: false,
    setSubCategoryEnableError: false,
    loadCategoriesLoading: false,
    loadCategoriesDone: false,
    loadCategoriesError: false,
};

export const ADD_CATEGORY_REQUEST = 'ADD_CATEGORY_REQUEST';
export const ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS';
export const ADD_CATEGORY_FAILURE = 'ADD_CATEGORY_FAILURE';

export const ADD_SUBCATEGORY_REQUEST = 'ADD_SUBCATEGORY_REQUEST';
export const ADD_SUBCATEGORY_SUCCESS = 'ADD_SUBCATEGORY_SUCCESS';
export const ADD_SUBCATEGORY_FAILURE = 'ADD_SUBCATEGORY_FAILURE';

export const SET_CATEGORY_ENABLE_REQUEST = 'SET_CATEGORY_ENABLE_REQUEST';
export const SET_CATEGORY_ENABLE_SUCCESS = 'SET_CATEGORY_ENABLE_SUCCESS';
export const SET_CATEGORY_ENABLE_FAILURE = 'SET_CATEGORY_ENABLE_FAILURE';

export const SET_SUBCATEGORY_ENABLE_REQUEST = 'SET_SUBCATEGORY_ENABLE_REQUEST';
export const SET_SUBCATEGORY_ENABLE_SUCCESS = 'SET_SUBCATEGORY_ENABLE_SUCCESS';
export const SET_SUBCATEGORY_ENABLE_FAILURE = 'SET_SUBCATEGORY_ENABLE_FAILURE';

export const LOAD_CATEGORIES_REQUEST = 'LOAD_CATEGORIES_REQUEST';
export const LOAD_CATEGORIES_SUCCESS = 'LOAD_CATEGORIES_SUCCESS';
export const LOAD_CATEGORIES_FAILURE = 'LOAD_CATEGORIES_FAILURE';

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case ADD_CATEGORY_REQUEST:
                draft.addCategoryLoading = true;
                draft.addCategoryDone = false;
                draft.addCategoryError = null;
                break;
            case ADD_CATEGORY_SUCCESS:
                draft.categories = action.data;
                draft.addCategoryDone = true;
                draft.addCategoryLoading = false;
                break;
            case ADD_CATEGORY_FAILURE:
                draft.addCategoryLoading = false;
                draft.addCategoryError = action.error;
                break;
            case ADD_SUBCATEGORY_REQUEST:
                draft.addSubCategoryLoading = true;
                draft.addSubCategoryDone = false;
                draft.addSubCategoryError = null;
                break;
            case ADD_SUBCATEGORY_SUCCESS:
                draft.categories = action.data;
                draft.addSubCategoryDone = true;
                draft.addSubCategoryLoading = false;
                break;
            case ADD_SUBCATEGORY_FAILURE:
                draft.addSubCategoryLoading = false;
                draft.addSubCategoryError = action.error;
                break;
            case SET_CATEGORY_ENABLE_REQUEST:
                draft.setCategoryEnableLoading = true;
                draft.setCategoryEnableDone = false;
                draft.setCategoryEnableError = null;
                break;
            case SET_CATEGORY_ENABLE_SUCCESS:
                draft.categories = action.data;
                draft.setCategoryEnableDone = true;
                draft.setCategoryEnableLoading = false;
                break;
            case SET_CATEGORY_ENABLE_FAILURE:
                draft.setCategoryEnableLoading = false;
                draft.setCategoryEnableError = action.error;
                break;
            case SET_SUBCATEGORY_ENABLE_REQUEST:
                draft.setSubCategoryEnableLoading = true;
                draft.setSubCategoryEnableDone = false;
                draft.setSubCategoryEnableError = null;
                break;
            case SET_SUBCATEGORY_ENABLE_SUCCESS:
                draft.categories = action.data;
                draft.setSubCategoryEnableDone = true;
                draft.setSubCategoryEnableLoading = false;
                break;
            case SET_SUBCATEGORY_ENABLE_FAILURE:
                draft.setSubCategoryEnableLoading = false;
                draft.setSubCategoryEnableError = action.error;
                break;
            case LOAD_CATEGORIES_REQUEST:
                draft.loadCategoriesLoading = true;
                draft.loadCategoriesDone = false;
                draft.loadCategoriesError = null;
                break;
            case LOAD_CATEGORIES_SUCCESS:
                draft.categories = action.data;
                draft.loadCategoriesDone = true;
                draft.loadCategoriesLoading = false;
                break;
            case LOAD_CATEGORIES_FAILURE:
                draft.loadCategoriesLoading = false;
                draft.loadCategoriesError = action.error;
                break;
            default:
                break;
        };
    });
};

export default reducer;