import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import NavigationBar from '../../components/NavigationBar';
import NewPosts from '../../components/Theme/NewPosts';
import TItleInfoCard from '../../components/Theme/TItleInfoCard';
import TopFivePosts from '../../components/Theme/TopFivePosts';
import { LOAD_CATEGORIES_REQUEST } from '../../reducers/category';
import { LOAD_CATEGORIES_NEW_15_POSTS_REQUEST } from '../../reducers/posts';
import wrapper from '../../store/configureStore';

const Theme = () => {
    const router = useRouter();
    const { theme } = router.query;
    const { categories } = useSelector((state) => state.category);

    return (
        <Fragment>
            <Head>
                <title>{`${theme ? theme : null} 게시판 - 두들링`}</title>
                <link rel='shortcut icon' href='/doodling-favicon.png'/>
                <meta charSet='utf-8'/>
                <meta name="language" content="Korean" />
                <meta name="author" content="쿠키로켓" />
                <meta name="description" content="두들링 - MBTI 기반 커뮤니티" />
                <meta name="keywords" content="MBTI, 커뮤니티" />
            </Head>
            <NavigationBar categoryDomain={theme} />
            <TItleInfoCard category={categories.find((cat) => cat.domain === theme)} />
            <TopFivePosts />
            <NewPosts />
        </Fragment>
    );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async({ req, res, params }) => {
    const cookie = req ? req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if(req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    };
    store.dispatch({
        type: LOAD_CATEGORIES_REQUEST
    });
    store.dispatch({
        type: LOAD_CATEGORIES_NEW_15_POSTS_REQUEST,
        data: params.theme
    });
    store.dispatch(END);

    await store.sagaTask.toPromise();
});

export default Theme;