import produce from '../util/produce';

export const initialState = {
    categories: [
        {
            "id": 0,
            "label": "홈",
            "domain": "main",
            "enabled": true,
            "order": 0,
            "SubCategories": []
        },
        {
            "id": 1,
            "label": "MBTI",
            "domain": "mbti",
            "enabled": true,
            "order": 1,
            "SubCategories": [
                {
                    "id": 1,
                    "label": "전체",
                    "domain": "",
                    "enabled": true,
                    "order": 1,
                    "CategoryId": 1
                },
                {
                    "id": 2,
                    "label": "연애&썸",
                    "domain": "mbtiLoveAndSome",
                    "enabled": true,
                    "order": 2,
                    "CategoryId": 1
                }
            ]
        },
        {
            "id": 3,
            "label": "TOP100",
            "domain": "top100",
            "enabled": true,
            "order": 2,
            "SubCategories": [
                {
                    "id": 3,
                    "label": "실시간",
                    "domain": "",
                    "enabled": true,
                    "order": 3,
                    "CategoryId": 3
                },
                {
                    "id": 4,
                    "label": "주간 ",
                    "domain": "top100Weekly",
                    "enabled": true,
                    "order": 4,
                    "CategoryId": 3
                },
                {
                    "id": 5,
                    "label": "월간  ",
                    "domain": "top100Monthly",
                    "enabled": true,
                    "order": 5,
                    "CategoryId": 3
                }
            ]
        },
        {
            "id": 2,
            "label": "이슈",
            "domain": "issue",
            "enabled": true,
            "order": 3,
            "SubCategories": [
                {
                    "id": 6,
                    "label": "전체",
                    "domain": "",
                    "enabled": true,
                    "order": 6,
                    "CategoryId": 2
                },
            ]
        }
    ],
    addCategoryLoading: false,
    addCategoryDone: false,
    addCategoryError: false,
};

export const ADD_CATEGORY_REQUEST = 'ADD_CATEGORY_REQUEST';
export const ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS';
export const ADD_CATEGORY_FAILURE = 'ADD_CATEGORY_FAILURE';

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
            default:
                break;
        };
    });
};

export default reducer;