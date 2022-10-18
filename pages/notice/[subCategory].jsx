import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';
import { END } from 'redux-saga';
import NavigationBar from '../../components/NavigationBar';
import NewSubPosts from '../../components/Theme/NewSubPosts';
import { LOAD_CATEGORIES_REQUEST } from '../../reducers/category';
import { LOAD_SUBCATEGORIES_NEW_POSTS_REQUEST } from '../../reducers/posts';
import wrapper from '../../store/configureStore';

const NoticeSubCategory = () => {
    const router = useRouter();
    const { subCategory } = router.query;

    return (
        <Fragment>
            <Head>
                <title>{`공지 게시판 - 두들링`}</title>
                <link rel='shortcut icon' href='/doodling-favicon.png'/>
                <meta charSet='utf-8'/>
                <meta name="language" content="Korean" />
                <meta name="author" content="쿠키로켓" />
                <meta name="description" content="두들링 - MBTI 기반 커뮤니티" />
                <meta name="keywords" content="MBTI, 커뮤니티" />
            </Head>
            <NavigationBar categoryDomain='notice' subCategoryDomain={subCategory} />
            <NewSubPosts subCategoryDomain={subCategory} />
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
        type: LOAD_SUBCATEGORIES_NEW_POSTS_REQUEST,
        data: { subTheme: params.subCategory, lastId: null }
    });
    store.dispatch(END);

    await store.sagaTask.toPromise();
});

export default NoticeSubCategory;