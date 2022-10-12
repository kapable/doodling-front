import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import user from './user';
import post from './post';
import posts from './posts';
import category from './category';

const rootReducer = (state, action) => {
    switch (action.type) {
        case HYDRATE:
            return action.payload;
        default: {
            const combineReducer = combineReducers({
                user,
                post,
                posts,
                category,
            });
            return combineReducer(state, action);
        }
    }
};

export default rootReducer;