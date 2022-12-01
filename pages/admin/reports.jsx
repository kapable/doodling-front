import { LeftOutlined } from '@ant-design/icons';
import { Col, Divider, Row } from 'antd';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { Router } from 'next/router';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import ReportArticles from '../../components/Admin/Reports/ReportArticles';
import ReportLabels from '../../components/Admin/Reports/ReportLabels';
import { GET_REPORTED_ARTICLES_REQUEST, GET_REPORT_LABELS_REQUEST } from '../../reducers/report';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import wrapper from '../../store/configureStore';

const Reports = () => {
    const { myInfo } = useSelector((state) => state.user);
    
    useEffect(() => {
        if(!myInfo?.admin) {
            alert('관리자만 접근할 수 있습니다!');
            Router.replace('/login');
        }
    }, [myInfo]);

    if(myInfo?.admin) {
        return (
            <div>
                <Head>
                    <title>신고 관리 | 두들링</title>
                    <link rel='main-url' href='https://doodling.kr/admin/reports' />
                    <link rel='shortcut icon' href='/doodling-favicon.png'/>
                    <meta charSet='utf-8'/>
                    <meta name="language" content="Korean" />
                    <meta name="author" content="쿠키로켓" />
                    <meta name="description" content="신고 관리 | 두들링 - MBTI 기반 커뮤니티" />
                    <meta name="keywords" content="MBTI, 커뮤니티" />

                    {/* <!-- Open Graph / Facebook --> */}
                    <meta property="og:type" content="website"/>
                    <meta property="og:url" content='https://doodling.kr/admin/reports' />
                    <meta property="og:title" content='신고 관리 | 두들링'/>
                    <meta property="og:description" content="신고 관리 | 두들링 - MBTI 기반 커뮤니티"/>
                    <meta property="og:image" content="/doodling-favicon.png"/>
                    <meta property="og:image:width" content="800"/>
                    <meta property="og:image:height" content="400"/>
                    <meta property="og:image:alt" content="신고 관리 | 두들링 - MBTI 기반 커뮤니티" />
                    <meta property='og:site_name' content='신고 관리 | 두들링' />

                    {/* <!-- Twitter --> */}
                    <meta property="twitter:card" content="summary_large_image"/>
                    <meta property="twitter:url" content='https://doodling.kr/admin/reports'/>
                    <meta property="twitter:title" content='신고 관리 | 두들링'/>
                    <meta property="twitter:description" content="신고 관리 | 두들링 - MBTI 기반 커뮤니티"/>
                    <meta property="twitter:image" content="/doodling-favicon.png"/>
                    <meta property="twitter:image:width" content="800"/>
                    <meta property="twitter:image:height" content="400"/>
                    <meta property="twitter:image:alt" content="신고 관리 | 두들링 - MBTI 기반 커뮤니티" />
                    <meta property='og:site_name' content='신고 관리 | 두들링' />
                </Head>
                {/* go to admin main page */}
                <Row className='profile-follow-back-to-profile-row'>
                    <Col span={24}>
                        <Link href={`/admin`}><a><LeftOutlined /> 어드민 메인 페이지</a></Link>
                    </Col>
                </Row>
                <ReportLabels />
                <Divider />
                <ReportArticles />
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
        type: GET_REPORT_LABELS_REQUEST
    });
    store.dispatch({
        type: GET_REPORTED_ARTICLES_REQUEST,
    });
    store.dispatch(END);

    await store.sagaTask.toPromise();
});

export default Reports;