import axios from 'axios';
import React, { Fragment } from 'react';
import { END } from 'redux-saga';
import NavigationBar from '../components/NavigationBar';
import { LOAD_CATEGORIES_REQUEST } from '../reducers/category';
import wrapper from '../store/configureStore';

const Notice = () => {
    return (
        <Fragment>
            <NavigationBar categoryDomain='notice' />
        </Fragment>
    );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async({ req, res }) => {
    const cookie = req ? req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if(req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    };
    store.dispatch({
        type: LOAD_CATEGORIES_REQUEST
    });
    store.dispatch(END);

    await store.sagaTask.toPromise();
});

export default Notice