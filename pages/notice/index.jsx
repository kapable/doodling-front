import axios from 'axios';
import Head from 'next/head';
import React, { Fragment } from 'react'
import { END } from 'redux-saga';
import CategoryNewPosts from '../../components/Home/CategoryNewPosts';
import NavigationBar from '../../components/NavigationBar';
import { LOAD_CATEGORIES_REQUEST } from '../../reducers/category';
import { LOAD_CATEGORY_EACH_SUBCATEGORY_NEW_POSTS_REQUEST } from '../../reducers/posts';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import wrapper from '../../store/configureStore';

const Notice = () => {
    return (
        <Fragment>
            <Head>
                <title>{`공지 - 두들링`}</title>
                <link rel='shortcut icon' href='/doodling-favicon.png'/>
                <meta charSet='utf-8'/>
                <meta name="language" content="Korean" />
                <meta name="author" content="쿠키로켓" />
                <meta name="description" content="두들링 - MBTI 기반 커뮤니티" />
                <meta name="keywords" content="MBTI, 커뮤니티" />
            </Head>
            <NavigationBar categoryDomain='notice' />
            <CategoryNewPosts category={'notice'} />
        </Fragment>
    )
}

export default Notice;

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
        type: LOAD_CATEGORY_EACH_SUBCATEGORY_NEW_POSTS_REQUEST,
        data: 'notice'
    });
    store.dispatch({
        type: LOAD_MY_INFO_REQUEST // 로그인 했다면 유저 정보 가져오기
    });
    store.dispatch(END);

    await store.sagaTask.toPromise();
});