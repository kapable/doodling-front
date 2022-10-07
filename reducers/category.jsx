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
};

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {

            default:
                break;
        };
    });
};

export default reducer;