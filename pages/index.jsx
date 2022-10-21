import React, { Fragment } from 'react';
import Head from 'next/head';
import NavigationBar from '../components/NavigationBar';
import wrapper from '../store/configureStore';
import axios from 'axios';
import { LOAD_CATEGORIES_REQUEST } from '../reducers/category';
import { END } from 'redux-saga';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { LOAD_CATEGORIES_NEW_15_POSTS_REQUEST, LOAD_CATEGORIES_NEW_POSTS_REQUEST, LOAD_REALTIME_TOP_10_REQUEST } from '../reducers/posts';
import NoticeRollingBanner from '../components/Home/NoticeRollingBanner';
import TopPosts from '../components/Home/TopPosts';
import CategoryNewPosts from '../components/Home/CategoryNewPosts';
import { useSelector } from 'react-redux';


const Home = () => {
    const { categories } = useSelector((state) => state.category);
    const { categoryNewPosts } = useSelector((state) => state.posts);

    return (
        <Fragment>
            <Head>
                <title>두들링 - Doodling</title>
                <link rel='shortcut icon' href='/doodling-favicon.png'/>
                <link rel="mask-icon" href="/doodling-favicon.png" />
                <meta charSet='utf-8'/>
                <meta name="language" content="Korean" />
                <meta name="author" content="쿠키로켓" />
                <meta name="description" content="두들링 - MBTI 기반 커뮤니티" />
                <meta name="keywords" content="MBTI, 커뮤니티" />
            </Head>
            <NavigationBar categoryDomain={categories[0]?.domain} />
            <NoticeRollingBanner />
            <TopPosts />
            <CategoryNewPosts />
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
    store.dispatch({
        type: LOAD_CATEGORIES_NEW_POSTS_REQUEST
    });
    store.dispatch({
        type: LOAD_MY_INFO_REQUEST
    });
    store.dispatch({
        type: LOAD_CATEGORIES_NEW_15_POSTS_REQUEST,
        data: { theme: 'notice', lastId: null }
    });
    store.dispatch({
        type: LOAD_REALTIME_TOP_10_REQUEST
    });
    store.dispatch(END);

    await store.sagaTask.toPromise();
});

export default Home;