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

    return (
        <Fragment>
            <Head>
                <title>두들링 - Doodling</title>
                <link rel='main-url' href='https://doodling.kr' />
                <link rel='shortcut icon' href='/doodling-favicon.png'/>
                <meta charSet='utf-8'/>
                <meta name="language" content="Korean" />
                <meta name="author" content="쿠키로켓" />
                <meta name="description" content="두들링 - MBTI 기반 커뮤니티" />
                <meta name="keywords" content="MBTI, 커뮤니티" />

                {/* <!-- Open Graph / Facebook --> */}
                <meta property="og:type" content="website"/>
                <meta property="og:url" content='https://doodling.kr' />
                <meta property="og:title" content='두들링 - Doodling'/>
                <meta property="og:description" content="두들링 - MBTI 기반 커뮤니티"/>
                <meta property="og:image" content="/doodling-favicon.png"/>
                <meta property="og:image:width" content="800"/>
                <meta property="og:image:height" content="400"/>
                <meta property="og:image:alt" content="두들링 - MBTI 기반 커뮤니티" />
                <meta property='og:site_name' content='두들링 - Doodling' />

                {/* <!-- Twitter --> */}
                <meta property="twitter:card" content="summary_large_image"/>
                <meta property="twitter:url" content='https://doodling.kr'/>
                <meta property="twitter:title" content='두들링 - Doodling'/>
                <meta property="twitter:description" content="두들링 - MBTI 기반 커뮤니티"/>
                <meta property="twitter:image" content="/doodling-favicon.png"/>
                <meta property="twitter:image:width" content="800"/>
                <meta property="twitter:image:height" content="400"/>
                <meta property="twitter:image:alt" content="두들링 - MBTI 기반 커뮤니티" />
                <meta property='og:site_name' content='두들링 - Doodling' />
            </Head>
            <NavigationBar categoryDomain={categories[0]?.domain} />
            <NoticeRollingBanner />
            <TopPosts />
            {/* <CategoryNewPosts /> */}
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
    // store.dispatch({
    //     type: LOAD_CATEGORIES_NEW_POSTS_REQUEST
    // });
    store.dispatch({
        type: LOAD_MY_INFO_REQUEST
    });
    // store.dispatch({
    //     type: LOAD_CATEGORIES_NEW_15_POSTS_REQUEST,
    //     data: { theme: 'notice', lastId: null }
    // });
    store.dispatch({
        type: LOAD_REALTIME_TOP_10_REQUEST
    });
    store.dispatch(END);

    await store.sagaTask.toPromise();
});

export default Home;