import React, { Fragment, useEffect } from 'react';
import { Row, Col } from 'antd';
import { OrderedListOutlined, TagsOutlined, QuestionOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import { END } from 'redux-saga';
import wrapper from '../../store/configureStore';
import Head from 'next/head';
import axios from 'axios';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';

const AdminHome = () => {
    const { myInfo } = useSelector((state) => state.user);
    
    useEffect(() => {
        if(!myInfo?.admin) {
            alert('관리자만 접근할 수 있습니다!');
            Router.replace('/login');
        }
    }, [myInfo]);

    if(myInfo?.admin) {
        return (
            <Fragment>
                <Head>
                    <title>어드민 | 두들링</title>
                    <link rel='main-url' href='https://doodling.kr/admin' />
                    <link rel='shortcut icon' href='/doodling-favicon.png'/>
                    <meta charSet='utf-8'/>
                    <meta name="language" content="Korean" />
                    <meta name="author" content="쿠키로켓" />
                    <meta name="description" content="어드민 | 두들링 - MBTI 기반 커뮤니티" />
                    <meta name="keywords" content="MBTI, 커뮤니티" />ㅎ

                    {/* <!-- Open Graph / Facebook --> */}
                    <meta property="og:type" content="website"/>
                    <meta property="og:url" content='https://doodling.kr/admin' />
                    <meta property="og:title" content='어드민 | 두들링'/>
                    <meta property="og:description" content="어드민 | 두들링 - MBTI 기반 커뮤니티"/>
                    <meta property="og:image" content="/doodling-favicon.png"/>
                    <meta property="og:image:width" content="800"/>
                    <meta property="og:image:height" content="400"/>
                    <meta property="og:image:alt" content="어드민 | 두들링 - MBTI 기반 커뮤니티" />
                    <meta property='og:site_name' content='어드민 | 두들링' />

                    {/* <!-- Twitter --> */}
                    <meta property="twitter:card" content="summary_large_image"/>
                    <meta property="twitter:url" content='https://doodling.kr/admin'/>
                    <meta property="twitter:title" content='어드민 | 두들링'/>
                    <meta property="twitter:description" content="어드민 | 두들링 - MBTI 기반 커뮤니티"/>
                    <meta property="twitter:image" content="/doodling-favicon.png"/>
                    <meta property="twitter:image:width" content="800"/>
                    <meta property="twitter:image:height" content="400"/>
                    <meta property="twitter:image:alt" content="어드민 | 두들링 - MBTI 기반 커뮤니티" />
                    <meta property='og:site_name' content='어드민 | 두들링' />
                </Head>
                <Row className='admin-index-row'>
                    <Col className='admin-index-col' xs={24} sm={24} md={12} lg={12}>
                        <Link href='/admin/posts'><a><OrderedListOutlined /><br />포스트 관리</a></Link>
                    </Col>
                    <Col className='admin-index-col' xs={24} sm={24} md={12} lg={12}>
                        <Link href='/admin/users'><a><OrderedListOutlined /><br />유저 관리</a></Link>
                    </Col>
                    <Col className='admin-index-col' xs={24} sm={24} md={12} lg={12}>
                        <Link href='/admin/category'><a><TagsOutlined /><br />카테고리 편집</a></Link>
                    </Col>
                    <Col className='admin-index-col' xs={24} sm={24} md={12} lg={12}>
                        <Link href='/admin/reports'><a><TagsOutlined /><br />신고 관리</a></Link>
                    </Col>
                    <Col className='admin-index-col' xs={24} sm={24} md={12} lg={12}>
                        <QuestionOutlined /><br />텅 빈 버튼
                    </Col>
                </Row>
            </Fragment>
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
    store.dispatch(END);

    await store.sagaTask.toPromise();
});

export default AdminHome;