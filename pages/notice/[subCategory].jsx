import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';
import { END } from 'redux-saga';
import NavigationBar from '../../components/NavigationBar';
import NewSubPosts from '../../components/Theme/NewSubPosts';
import { LOAD_CATEGORIES_REQUEST } from '../../reducers/category';
import { LOAD_SUBCATEGORIES_NEW_POSTS_REQUEST } from '../../reducers/posts';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import wrapper from '../../store/configureStore';

const NoticeSubCategory = () => {
    const router = useRouter();
    const { subCategory } = router.query;

    return (
        <Fragment>
            <Head>
                <title>{`공지 게시판 - 두들링`}</title>
                <link rel='shortcut icon' href='/doodling-favicon.png'/>
                <link rel='main-url' href={`https://doodling.kr/notice/${subCategory}`} />
                <link rel='shortcut icon' href='/doodling-favicon.png'/>
                <meta charSet='utf-8'/>
                <meta name="language" content="Korean" />
                <meta name="author" content="쿠키로켓" />
                <meta name="description" content="두들링 - MBTI 기반 커뮤니티" />
                <meta name="keywords" content="MBTI, 커뮤니티" />

                {/* <!-- Open Graph / Facebook --> */}
                <meta property="og:type" content="website"/>
                <meta property="og:url" content={`https://doodling.kr/notice/${subCategory}`} />
                <meta property="og:title" content='공지 | 두들링 - Doodling'/>
                <meta property="og:description" content="두들링 - MBTI 기반 커뮤니티"/>
                <meta property="og:image" content="/doodling-favicon.png"/>
                <meta property="og:image:width" content="800"/>
                <meta property="og:image:height" content="400"/>
                <meta property="og:image:alt" content="두들링 - MBTI 기반 커뮤니티" />
                <meta property='og:site_name' content='공지 | 두들링 - Doodling' />

                {/* <!-- Twitter --> */}
                <meta property="twitter:card" content="summary_large_image"/>
                <meta property="twitter:url" content={`https://doodling.kr/notice/${subCategory}`}/>
                <meta property="twitter:title" content='공지 | 두들링 - Doodling'/>
                <meta property="twitter:description" content="두들링 - MBTI 기반 커뮤니티"/>
                <meta property="twitter:image" content="/doodling-favicon.png"/>
                <meta property="twitter:image:width" content="800"/>
                <meta property="twitter:image:height" content="400"/>
                <meta property="twitter:image:alt" content="두들링 - MBTI 기반 커뮤니티" />
                <meta property='og:site_name' content='공지 | 두들링 - Doodling' />
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
    store.dispatch({
        type: LOAD_MY_INFO_REQUEST // 로그인 했다면 유저 정보 가져오기
    });
    store.dispatch(END);

    await store.sagaTask.toPromise();
});

export default NoticeSubCategory;