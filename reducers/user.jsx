import produce from '../util/produce';

export const initialState = {
    myInfo: {},
    userInfo: {},
    nicnameExist: null,
    isFollowing: false,
    logInLoading: false,
    logInDone: false,
    logInError: false,
    logOutLoading: false,
    logOutDone: false,
    logOutError: false,
    signUpLoading: false,
    signUpDone: false,
    signUpError: false,
    loadMyInfoLoading: false,
    loadMyInfoDone: false,
    loadMyInfoError: false,
    loadUserInfoLoading: false,
    loadUserInfoDone: false,
    loadUserInfoError: false,
    changeNicknameAndMbtiLoading: false,
    changeNicknameAndMbtiDone: false,
    changeNicknameAndMbtiError: false,
    changeDescriptionLoading: false,
    changeDescriptionDone: false,
    changeDescriptionError: false,
    checkNicknameDoubledLoading: false,
    checkNicknameDoubledDone: false,
    checkNicknameDoubledError: false,
    unFollowLoading: false,
    unFollowDone: false,
    unFollowError: false,
    followLoading: false,
    followDone: false,
    followError: false,
};

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';

export const LOAD_USER_INFO_REQUEST = 'LOAD_USER_INFO_REQUEST';
export const LOAD_USER_INFO_SUCCESS = 'LOAD_USER_INFO_SUCCESS';
export const LOAD_USER_INFO_FAILURE = 'LOAD_USER_INFO_FAILURE';

export const CHANGE_NICKNAME_AND_MBTI_REQUEST = 'CHANGE_NICKNAME_AND_MBTI_REQUEST';
export const CHANGE_NICKNAME_AND_MBTI_SUCCESS = 'CHANGE_NICKNAME_AND_MBTI_SUCCESS';
export const CHANGE_NICKNAME_AND_MBTI_FAILURE = 'CHANGE_NICKNAME_AND_MBTI_FAILURE';

export const CHANGE_DESCRIPTION_REQUEST = 'CHANGE_DESCRIPTION_REQUEST';
export const CHANGE_DESCRIPTION_SUCCESS = 'CHANGE_DESCRIPTION_SUCCESS';
export const CHANGE_DESCRIPTION_FAILURE = 'CHANGE_DESCRIPTION_FAILURE';

export const CHECK_NICKNAME_DOUBLED_REQUEST = 'CHECK_NICKNAME_DOUBLED_REQUEST';
export const CHECK_NICKNAME_DOUBLED_SUCCESS = 'CHECK_NICKNAME_DOUBLED_SUCCESS';
export const CHECK_NICKNAME_DOUBLED_FAILURE = 'CHECK_NICKNAME_DOUBLED_FAILURE';

export const CHECK_IS_FOLLOWING_REQUEST = 'CHECK_IS_FOLLOWING_REQUEST';
export const CHECK_IS_FOLLOWING_SUCCESS = 'CHECK_IS_FOLLOWING_SUCCESS';
export const CHECK_IS_FOLLOWING_FAILURE = 'CHECK_IS_FOLLOWING_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

export const ADD_POST_LIKE_TO_ME = 'ADD_POST_LIKE_TO_ME';
export const REMOVE_POST_LIKE_TO_ME = 'REMOVE_POST_LIKE_TO_ME';

export const ADD_COMMENT_LIKE_TO_ME = 'ADD_COMMENT_LIKE_TO_ME';
export const REMOVE_COMMENT_LIKE_TO_ME = 'REMOVE_COMMENT_LIKE_TO_ME';


const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case LOG_IN_REQUEST:
                draft.logInLoading = true;
                draft.logInDone = false;
                draft.logInError = null;
                break;
            case LOG_IN_SUCCESS:
                draft.logInLoading = false;
                draft.logInDone = true;
                draft.myInfo = action.data;
                break;
            case LOG_IN_FAILURE:
                draft.logInLoading = false;
                draft.logInError = action.error;
                break;
            case LOG_OUT_REQUEST:
                draft.logOutLoading = true;
                draft.logOutDone = false;
                draft.logOutError = null;
                break;
            case LOG_OUT_SUCCESS:
                draft.logOutLoading = false;
                draft.logOutDone = true;
                draft.logInDone = false;
                draft.myInfo = null;
                break;
            case LOG_OUT_FAILURE:
                draft.logOutLoading = false;
                draft.logOutError = action.error;
                break;
            case SIGN_UP_REQUEST:
                draft.signUpLoading = true;
                draft.signUpDone = false;
                draft.signUpError = null;
                break;
            case SIGN_UP_SUCCESS:
                draft.signUpLoading = false;
                draft.signUpDone = true;
                break;
            case SIGN_UP_FAILURE:
                draft.signUpLoading = false;
                draft.signUpDone = false;
                draft.signUpError = action.error;
                break;
            case LOAD_MY_INFO_REQUEST:
                draft.loadMyInfoLoading = true;
                draft.loadMyInfoDone = false;
                draft.loadMyInfoError = null;
                break;
            case LOAD_MY_INFO_SUCCESS:
                draft.myInfo = action?.data || null;
                draft.loadMyInfoLoading = false;
                draft.loadMyInfoDone = true;
                break;
            case LOAD_MY_INFO_FAILURE:
                draft.loadMyInfoLoading = false;
                draft.loadMyInfoDone = false;
                draft.loadMyInfoError = action.error;
                break;
            case LOAD_USER_INFO_REQUEST:
                draft.loadUserInfoLoading = true;
                draft.loadUserInfoDone = false;
                draft.loadUserInfoError = null;
                break;
            case LOAD_USER_INFO_SUCCESS:
                draft.userInfo = action?.data || null;
                draft.loadUserInfoLoading = false;
                draft.loadUserInfoDone = true;
                break;
            case LOAD_USER_INFO_FAILURE:
                draft.loadUserInfoLoading = false;
                draft.loadUserInfoDone = false;
                draft.loadUserInfoError = action.error;
                break;
            case CHANGE_NICKNAME_AND_MBTI_REQUEST:
                draft.changeNicknameAndMbtiLoading = true;
                draft.changeNicknameAndMbtiDone = false;
                draft.changeNicknameAndMbtiError = null;
                break;
            case CHANGE_NICKNAME_AND_MBTI_SUCCESS:
                draft.userInfo.nickname = action?.data.nickname || null;
                draft.userInfo.mbti = action?.data.mbti || null;
                draft.changeNicknameAndMbtiLoading = false;
                draft.changeNicknameAndMbtiDone = true;
                break;
            case CHANGE_NICKNAME_AND_MBTI_FAILURE:
                draft.changeNicknameAndMbtiLoading = false;
                draft.changeNicknameAndMbtiDone = false;
                draft.changeNicknameAndMbtiError = action.error;
                break;
            case CHANGE_DESCRIPTION_REQUEST:
                draft.changeDescriptionLoading = true;
                draft.changeDescriptionDone = false;
                draft.changeDescriptionError = null;
                break;
            case CHANGE_DESCRIPTION_SUCCESS:
                draft.userInfo.description = action?.data.description || null;
                draft.changeDescriptionLoading = false;
                draft.changeDescriptionDone = true;
                break;
            case CHANGE_DESCRIPTION_FAILURE:
                draft.changeDescriptionLoading = false;
                draft.changeDescriptionDone = false;
                draft.changeDescriptionError = action.error;
                break;
            case CHECK_NICKNAME_DOUBLED_REQUEST:
                draft.checkNicknameDoubledLoading = true;
                draft.checkNicknameDoubledDone = false;
                draft.checkNicknameDoubledError = null;
                break;
            case CHECK_NICKNAME_DOUBLED_SUCCESS:
                draft.nicnameExist = action.data.exist;
                draft.checkNicknameDoubledLoading = false;
                draft.checkNicknameDoubledDone = true;
                break;
            case CHECK_NICKNAME_DOUBLED_FAILURE:
                draft.checkNicknameDoubledLoading = false;
                draft.checkNicknameDoubledDone = false;
                draft.checkNicknameDoubledError = action.error;
                break;
            case CHECK_IS_FOLLOWING_REQUEST:
                draft.checkIsFollowingLoading = true;
                draft.checkIsFollowingDone = false;
                draft.checkIsFollowingError = null;
                break;
            case CHECK_IS_FOLLOWING_SUCCESS:
                draft.isFollowing = action.data.isFollowing;
                draft.checkIsFollowingLoading = false;
                draft.checkIsFollowingDone = true;
                break;
            case CHECK_IS_FOLLOWING_FAILURE:
                draft.checkIsFollowingLoading = false;
                draft.checkIsFollowingDone = false;
                draft.checkIsFollowingError = action.error;
                break;
            case UNFOLLOW_REQUEST:
                draft.unFollowLoading = true;
                draft.unFollowDone = false;
                draft.unFollowError = null;
                break;
            case UNFOLLOW_SUCCESS:
                draft.isFollowing = action.data.isFollowing;
                draft.userInfo.followings = draft.userInfo.followings -1;
                draft.unFollowLoading = false;
                draft.unFollowDone = true;
                break;
            case UNFOLLOW_FAILURE:
                draft.unFollowLoading = false;
                draft.unFollowDone = false;
                draft.unFollowError = action.error;
                break;
            case FOLLOW_REQUEST:
                draft.followLoading = true;
                draft.followDone = false;
                draft.followError = null;
                break;
            case FOLLOW_SUCCESS:
                draft.isFollowing = action.data.isFollowing;
                draft.userInfo.followings = draft.userInfo.followings +1;
                draft.followLoading = false;
                draft.followDone = true;
                break;
            case FOLLOW_FAILURE:
                draft.followLoading = false;
                draft.followDone = false;
                draft.followError = action.error;
                break;
            case ADD_POST_LIKE_TO_ME:
                draft.userInfo.PostLiked.unshift(action.data);
                break;
            case REMOVE_POST_LIKE_TO_ME:
                draft.userInfo.PostLiked = draft.userInfo.PostLiked.filter((v) => v.id !== action.data.id);
                break;
            case ADD_COMMENT_LIKE_TO_ME:
                draft.userInfo.CommentLiked.unshift(action.data);
                break;
            case REMOVE_COMMENT_LIKE_TO_ME:
                draft.userInfo.CommentLiked = draft.userInfo.CommentLiked.filter((v) => v.id !== action.data.id);
                break;
            default:
                break;
        };
    });
};

export default reducer;