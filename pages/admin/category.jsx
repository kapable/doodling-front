import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import wrapper from '../../store/configureStore';
import Head from 'next/head';
import Router from 'next/router';
import CreateMainCategory from '../../components/Admin/Category/CreateMainCategory';
import CreateSubCategory from '../../components/Admin/Category/CreateSubCategory';
import SetCategoryList from '../../components/Admin/Category/SetCategoryList';
import { LOAD_CATEGORIES_REQUEST } from '../../reducers/category';
import axios from 'axios';
import { Col, Row } from 'antd';
import Link from 'next/link';
import { LeftOutlined } from '@ant-design/icons';

const Category = () => {
    const { categories } = useSelector((state) => state.category);
    const { myInfo } = useSelector((state) => state.user);
    
    useEffect(() => {
        if(!myInfo?.admin) {
            alert('관리자만 접근할 수 있습니다!');
            Router.replace('/login');
        }
    }, [myInfo]);

    if(myInfo?.admin) {
        return(
            <div className='admin-category-main-div'>
                <Head>
                    <title>카테고리 관리 | 두들링</title>
                    <link rel='main-url' href='https://doodling.kr/admin/category' />
                    <link rel='shortcut icon' href='/doodling-favicon.png'/>
                    <meta charSet='utf-8'/>
                    <meta name="language" content="Korean" />
                    <meta name="author" content="쿠키로켓" />
                    <meta name="description" content="카테고리 관리 | 두들링 - MBTI 기반 커뮤니티" />
                    <meta name="keywords" content="MBTI, 커뮤니티" />

                    {/* <!-- Open Graph / Facebook --> */}
                    <meta property="og:type" content="website"/>
                    <meta property="og:url" content='https://doodling.kr/admin/category' />
                    <meta property="og:title" content='카테고리 관리 | 두들링'/>
                    <meta property="og:description" content="카테고리 관리 | 두들링 - MBTI 기반 커뮤니티"/>
                    <meta property="og:image" content="/doodling-favicon.png"/>
                    <meta property="og:image:width" content="800"/>
                    <meta property="og:image:height" content="400"/>
                    <meta property="og:image:alt" content="카테고리 관리 | 두들링 - MBTI 기반 커뮤니티" />
                    <meta property='og:site_name' content='카테고리 관리 | 두들링' />

                    {/* <!-- Twitter --> */}
                    <meta property="twitter:card" content="summary_large_image"/>
                    <meta property="twitter:url" content='https://doodling.kr/admin/category'/>
                    <meta property="twitter:title" content='카테고리 관리 | 두들링'/>
                    <meta property="twitter:description" content="카테고리 관리 | 두들링 - MBTI 기반 커뮤니티"/>
                    <meta property="twitter:image" content="/doodling-favicon.png"/>
                    <meta property="twitter:image:width" content="800"/>
                    <meta property="twitter:image:height" content="400"/>
                    <meta property="twitter:image:alt" content="카테고리 관리 | 두들링 - MBTI 기반 커뮤니티" />
                    <meta property='og:site_name' content='카테고리 관리 | 두들링' />
                </Head>
                {/* go to admin main page */}
                <Row className='profile-follow-back-to-profile-row'>
                    <Col span={24}>
                        <Link href={`/admin`}><a><LeftOutlined /> 어드민 메인 페이지</a></Link>
                    </Col>
                </Row>
                {/* Sorting and Enabling */}
                <SetCategoryList categories={categories}/>

                {/* Creating Main Category */}
                <CreateMainCategory />

                {/* Creating Sub Category */}
                <CreateSubCategory categories={categories} />
            </div>
        )
    } else {
        return null;
    };
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async({ req, res, params }) => {
    const cookie = req ? req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if(req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    };
    store.dispatch({
        type: LOAD_MY_INFO_REQUEST
    });
    store.dispatch({
        type: LOAD_CATEGORIES_REQUEST
    });
    store.dispatch(END);

    await store.sagaTask.toPromise();
});

export default Category;