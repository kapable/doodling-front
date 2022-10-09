import React, { Fragment, useEffect } from 'react';
import { Row, Col } from 'antd';
import { EditOutlined, OrderedListOutlined, TagsOutlined, QuestionOutlined, ChromeOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import { END } from 'redux-saga';
// import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import wrapper from '../../store/configureStore';
import Head from 'next/head';

const AdminHome = () => {
    // const { userInfo } = useSelector((state) => state.user);
    
    // useEffect(() => {
    //     if(!userInfo?.admin) {
    //         alert('관리자 로그인이 필요합니다!');
    //         Router.replace('/login');
    //     }
    // }, [userInfo]);

    return (
        <Fragment>
            <Head>
            </Head>
            <Row className='admin-index-row'>
                <Col className='admin-index-col' xs={24} sm={24} md={12} lg={12} >
                    <Link href='/admin/upload'><a><EditOutlined /><br />새로운 포스트 올리기</a></Link>
                </Col>
                <Col className='admin-index-col' xs={24} sm={24} md={12} lg={12}>
                    <Link href='/admin/posts'><a><OrderedListOutlined /><br />기존 리스트 보기</a></Link>
                </Col>
                <Col className='admin-index-col' xs={24} sm={24} md={12} lg={12}>
                    <Link href='/admin/category'><a><TagsOutlined /><br />카테고리 편집</a></Link>
                </Col>
                <Col className='admin-index-col' xs={24} sm={24} md={12} lg={12}>
                    <Link href='/admin/urls'><a><ChromeOutlined /><br />URL 관리</a></Link>
                </Col>
                <Col className='admin-index-col' xs={24} sm={24} md={12} lg={12}>
                    <QuestionOutlined /><br />텅 빈 버튼
                </Col>
            </Row>
        </Fragment>
    );
};

export default AdminHome;