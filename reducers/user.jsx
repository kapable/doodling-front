import produce from '../util/produce';

export const initialState = {
    userInfo: {
        "id": 1,
        "email": "",
        "nickname": "",
        "description": null,
        "mbti": "",
        "admin": false,
        "adsAdmin": null,
        "enabled": true,
        "Posts": [
            {
                "id": 1,
                "title": "",
                "text": "",
                "noticeTop": null,
                "enabled": true,
                "views": 4,
                "createdAt": "2022-09-26T18:42:05.000Z",
                "updatedAt": "2022-09-30T04:07:56.000Z",
                "SubCategoryId": 1,
                "UserId": 1
            },
        ],
        "Comments": [],
        "PostLiked": []
    },
};

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            default:
                break;
        }
    })
}

export default reducer;