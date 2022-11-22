import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import NavigationBar from '../../components/NavigationBar';
import TItleInfoCard from '../../components/Theme/TItleInfoCard';
import TopFivePosts from '../../components/Theme/TopFivePosts';
import NewSubPosts from '../../components/Theme/NewSubPosts';
import wrapper from '../../store/configureStore';
import axios from 'axios';
import { LOAD_CATEGORIES_REQUEST } from '../../reducers/category';
import { END } from 'redux-saga';
import { useSelector } from 'react-redux';
import { LOAD_SUBCATEGORIES_NEW_POSTS_REQUEST, LOAD_SUBCATEGORY_REALTIME_TOP_5_REQUEST } from '../../reducers/posts';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';

const SubTheme = () => {
    const router = useRouter();
    const { theme, subTheme } = router.query;
    const { categories } = useSelector((state) => state.category);

    return (
        <Fragment>
            <Head>
                <title>{`${subTheme ? subTheme : null} 게시판 - 두들링`}</title>
                <link rel='main-url' href={`https://doodling.kr/${theme ? theme : null}/${subTheme ? subTheme : null}`} />
                <link rel='shortcut icon' href='/doodling-favicon.png'/>
                <meta charSet='utf-8'/>
                <meta name="language" content="Korean" />
                <meta name="author" content="쿠키로켓" />
                <meta name="description" content={`${subTheme ? subTheme : null} 게시판 - 두들링`} />
                <meta name="keywords" content="MBTI, 커뮤니티" />

                {/* <!-- Open Graph / Facebook --> */}
                <meta property="og:type" content="website"/>
                <meta property="og:url" content={`https://doodling.kr/${theme ? theme : null}/${subTheme ? subTheme : null}`} />
                <meta property="og:title" content={`${subTheme ? subTheme : null} 게시판 - 두들링`}/>
                <meta property="og:description" content={`${subTheme ? subTheme : null} 게시판 - 두들링`}/>
                <meta property="og:image" content="/doodling-favicon.png"/>
                <meta property="og:image:width" content="800"/>
                <meta property="og:image:height" content="400"/>
                <meta property="og:image:alt" content={`${subTheme ? subTheme : null} 게시판 - 두들링`} />
                <meta property='og:site_name' content={`${subTheme ? subTheme : null} 게시판 - 두들링`} />

                {/* <!-- Twitter --> */}
                <meta property="twitter:card" content="summary_large_image"/>
                <meta property="twitter:url" content={`https://doodling.kr/${theme ? theme : null}/${subTheme ? subTheme : null}`}/>
                <meta property="twitter:title" content={`${subTheme ? subTheme : null} 게시판 - 두들링`}/>
                <meta property="twitter:description" content={`${subTheme ? subTheme : null} 게시판 - 두들링`}/>
                <meta property="twitter:image" content="/doodling-favicon.png"/>
                <meta property="twitter:image:width" content="800"/>
                <meta property="twitter:image:height" content="400"/>
                <meta property="twitter:image:alt" content={`${subTheme ? subTheme : null} 게시판 - 두들링`} />
                <meta property='og:site_name' content={`${subTheme ? subTheme : null} 게시판 - 두들링`} />
            </Head>
            <NavigationBar categoryDomain={theme} subCategoryDomain={subTheme} />
            <TItleInfoCard category={categories.find((cat) => cat.domain === theme)} subTheme={subTheme}/>
            <TopFivePosts isSubCategory={true}/>
            <NewSubPosts subCategoryDomain={subTheme}/>
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
        type: LOAD_MY_INFO_REQUEST // 로그인 했다면 유저 정보 가져오기
    });
    store.dispatch({
        type: LOAD_SUBCATEGORIES_NEW_POSTS_REQUEST,
        data: { subTheme: params.subTheme, lastId: null }
    });
    store.dispatch({
        type: LOAD_SUBCATEGORY_REALTIME_TOP_5_REQUEST,
        data: params.subTheme
    });
    store.dispatch(END);

    await store.sagaTask.toPromise();
});

export default SubTheme;